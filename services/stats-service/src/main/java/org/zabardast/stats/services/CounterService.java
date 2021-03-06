package org.zabardast.stats.services;

import java.util.Date;
import java.util.function.Function;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.stats.dto.CounterResponseRepresentation;
import org.zabardast.stats.events.EventFactory;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.model.CounterKey;
import org.zabardast.stats.model.CounterStatistics;
import org.zabardast.stats.repository.CounterRepository;
import org.zabardast.stats.services.exceptions.CounterNotFoundException;

@Slf4j
@Service
public class CounterService
{
    @Autowired
    @Qualifier("transactionOutboxPublisher")
    EventPublisher eventPublisher;

    @Autowired
    EventFactory eventFactory;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    private CounterRepository counterRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public CounterStatistics getCounterStatistics(@NotNull String counterId) {
        CounterStatistics stats = counterRepository
                .getCounterStatistics(counterId)
                .orElseThrow(() -> new CounterNotFoundException(counterId));
        return stats;
    }

    @Transactional
    public CounterResponseRepresentation getCounter(@NotNull String counterId, @NotNull String ownerId) {
        Counter counter = counterRepository
                .findById(new CounterKey(counterId, ownerId))
                .orElseThrow(() -> new CounterNotFoundException(counterId));
        return modelMapper.map(counter, CounterResponseRepresentation.class);
    }

    @Transactional
    public Page<CounterResponseRepresentation> findAllByCounter(@NotNull String counterId, @NotNull Pageable pageable) {
        return counterRepository
                .findByCounter(counterId, pageable)
                .map(i -> modelMapper.map(i, CounterResponseRepresentation.class));
    }

    @Transactional
    public Page<CounterResponseRepresentation> findAllByOwner(@NotNull String ownerId, @NotNull Pageable pageable) {
        return counterRepository
                .findByOwner(ownerId, pageable)
                .map(i -> modelMapper.map(i, CounterResponseRepresentation.class));
    }

    @Transactional
    public Page<CounterResponseRepresentation> findAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Counter> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Counter.class,
                criteria,
                pageable.getSort());
        TypedQuery<Counter> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Counter> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, CounterResponseRepresentation.class));
    }

    @Transactional
    public CounterResponseRepresentation newCounter(@NotNull String counterId, @NotNull String ownerId, double value) {
        Counter counter = Counter.builder()
                .counter((counterId))
                .owner(ownerId)
                .value(value)
                .createdOn(new Date())
                .build();
        Counter saved = counterRepository.save(counter);
        eventPublisher.publishEvent(eventFactory.counterCreated(this, saved));
        return modelMapper.map(saved, CounterResponseRepresentation.class);
    }

    public CounterResponseRepresentation setCounter(@NotNull String counterId, @NotNull String ownerId, double value)
    {
        return this.setInternal(counterId, ownerId, (f) -> value);
    }

    public CounterResponseRepresentation increment(@NotNull String counterId, @NotNull String ownerId, double value)
    {
        return this.setInternal(counterId, ownerId, (f) -> value + f);
    }

    CounterResponseRepresentation setInternal(@NotNull String counterId, @NotNull String ownerId, Function<Double, Double> valueSetter)
    {
        return counterRepository.findById(new CounterKey(counterId, ownerId))
                .map(found -> {
                    found.setValue(valueSetter.apply(found.getValue()));
                    Counter saved = counterRepository.save(found);
                    eventPublisher.publishEvent(eventFactory.counterUpdated(this, saved));
                    return modelMapper.map(saved, CounterResponseRepresentation.class);
                })
                .orElseGet(() -> {
                    return newCounter(counterId, ownerId, valueSetter.apply(0d));
                });
    }

    @Transactional
    public void deleteCounter(@NotNull String counterId, @NotNull String ownerId) {
        CounterKey key = new CounterKey(counterId, ownerId);
        if(counterRepository.existsById(key)) {
            counterRepository.deleteById(key);
            eventPublisher.publishEvent(eventFactory.counterDeleted(this, key));
        }
    }
}
