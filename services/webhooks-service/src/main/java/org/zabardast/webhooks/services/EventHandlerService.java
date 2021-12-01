package org.zabardast.webhooks.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.webhooks.dto.EventHandlerRequestRepresentation;
import org.zabardast.webhooks.dto.EventHandlerResponseRepresentation;
import org.zabardast.webhooks.events.EventFactory;
import org.zabardast.webhooks.model.EventHandler;
import org.zabardast.webhooks.model.WebHook;
import org.zabardast.webhooks.repository.EventHandlerRepository;
import org.zabardast.webhooks.services.exceptions.EventHandlerAlreadyExistsException;
import org.zabardast.webhooks.services.exceptions.EventHandlerNotFoundException;
import org.zabardast.webhooks.services.exceptions.TopicNotFoundException;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class EventHandlerService {
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
    EventHandlerRepository eventHandlerRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public EventHandlerResponseRepresentation getEventHandler(Long postId) {

        return eventHandlerRepository
            .findById(postId)
            .map(i -> modelMapper.map(i, EventHandlerResponseRepresentation.class))
            .orElseThrow(() -> new EventHandlerNotFoundException(postId));
    }

    @Transactional
    public Page<EventHandlerResponseRepresentation> getAllEventHandlers(@NotNull Pageable page) {

        return eventHandlerRepository
            .findAll(page)
            .map(i -> modelMapper.map(i, EventHandlerResponseRepresentation.class));
    }

    @Transactional
    public Page<EventHandlerResponseRepresentation> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<EventHandler> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
            EventHandler.class,
            criteria,
            pageable.getSort());
        TypedQuery<EventHandler> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<EventHandler> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, EventHandlerResponseRepresentation.class));
    }

    @Transactional
    public EventHandlerResponseRepresentation newEventHandler(@NotNull String ownerId, @NotNull EventHandlerRequestRepresentation requestRepresentation) {

        EventHandler eventHandler = modelMapper.map(requestRepresentation, EventHandler.class);
        eventHandler.setOwner(ownerId);
        eventHandler.setCreatedOn(new Date());
        if(requestRepresentation.getTopics() != null && requestRepresentation.getTopics().size() > 0) {
            List<WebHook> topics = requestRepresentation
                .getTopics()
                .stream()
                .map(i -> topicRepository.findById(i).orElseThrow(() -> new TopicNotFoundException(i)))
                .collect(Collectors.toList());
            eventHandler.setTopics(new HashSet<WebHook>(topics));
        }

        EventHandler saved = eventHandlerRepository.save(eventHandler);
        eventPublisher.publishEvent(eventFactory.postCreated(this, saved));
        return modelMapper.map(saved, EventHandlerResponseRepresentation.class);
    }

    @Transactional
    public EventHandlerResponseRepresentation updateEventHandler(@NotNull Long postId,
                                                 @NotNull EventHandlerRequestRepresentation requestRepresentation) {

        return eventHandlerRepository.findById(postId)
            .map(found -> {
                found.setUpdatedOn(new Date());
                found.setSlug(requestRepresentation.getSlug());
                found.setTitle(requestRepresentation.getTitle());
                found.setText(requestRepresentation.getText());

                if(requestRepresentation.getTopics() != null && requestRepresentation.getTopics().size() > 0) {
                    List<WebHook> topics = requestRepresentation
                        .getTopics()
                        .stream()
                        .map(i -> topicRepository.findById(i).orElseThrow(() -> new TopicNotFoundException(i)))
                        .collect(Collectors.toList());
                    found.setTopics(new HashSet<WebHook>(topics));
                }

                EventHandler saved = eventHandlerRepository.save(found);
                eventPublisher.publishEvent(eventFactory.postUpdated(this, saved));
                return modelMapper.map(saved, EventHandlerResponseRepresentation.class);
            })
            .orElseThrow(() -> {
                throw new EventHandlerNotFoundException(postId);
            });
    }

    @Transactional
    public void deleteEventHandler(@NotNull Long postId) {

        eventHandlerRepository.deleteById(postId);
        eventPublisher.publishEvent(eventFactory.postDeleted(this, postId));
    }
}
