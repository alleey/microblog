package org.zabardast.stats.services;

import java.util.Date;
import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.stats.dto.CounterResponseRepresentation;
import org.zabardast.stats.events.CounterCreatedEvent;
import org.zabardast.stats.events.CounterDeletedEvent;
import org.zabardast.stats.events.CounterUpdatedEvent;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.model.CounterKey;
import org.zabardast.stats.model.CounterStatistics;
import org.zabardast.stats.repository.CounterRepository;
import org.zabardast.stats.services.exceptions.CounterNotFoundException;

@Service
public class CounterService
{
    @Autowired
    EventPublisher eventPublisher;

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
    public Page<CounterResponseRepresentation> getAllCounters(@NotNull String counterId, @NotNull Pageable pageable) {
        return counterRepository
                .findByCounter(counterId, pageable)
                .map(i -> modelMapper.map(i, CounterResponseRepresentation.class));
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
        eventPublisher.publishEvent(new CounterCreatedEvent(this, saved));
        return modelMapper.map(saved, CounterResponseRepresentation.class);
    }

    public CounterResponseRepresentation addCounter(@NotNull String counterId, @NotNull String ownerId, double value)
    {
        return counterRepository.findById(new CounterKey(counterId, ownerId))
            .map(found -> {
                found.setValue(value);
                Counter saved = counterRepository.save(found);
                eventPublisher.publishEvent(new CounterUpdatedEvent(this, saved));
                return modelMapper.map(saved, CounterResponseRepresentation.class);
            })
            .orElseGet(() -> {
                return newCounter(counterId, ownerId, value);
            });
    }

    @Transactional
    public void deleteCounter(@NotNull String counterId, @NotNull String ownerId) {
        CounterKey key = new CounterKey(counterId, ownerId);
        if(counterRepository.existsById(key)) {
            counterRepository.deleteById(key);
            eventPublisher.publishEvent(new CounterDeletedEvent(this, key));
        }
    }
}
