package org.zabardast.blog.services;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageImpl;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.events.TopicCreatedEvent;
import org.zabardast.blog.events.TopicDeletedEvent;
import org.zabardast.blog.events.TopicUpdatedEvent;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.repository.TopicRepository;
import org.zabardast.blog.services.exceptions.TopicAlreadyExistsException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class TopicService
{
    @Autowired
    @Qualifier("transactionOutboxPublisher")
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired TopicRepository topicRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public TopicResponseRepresentation findOne(@NotNull Long topicId) {
        return topicRepository
                .findById(topicId)
                .map(i -> modelMapper.map(i, TopicResponseRepresentation.class))
                .orElseThrow(() -> new TopicNotFoundException(topicId));
    }

    @Transactional
    public Page<TopicResponseRepresentation> getAllTopics(@NotNull Pageable page) {
        return topicRepository
                .findAll(page)
                .map(i -> modelMapper.map(i, TopicResponseRepresentation.class));
    }

    @Transactional
    public Page<TopicResponseRepresentation> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Topic> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Topic.class,
                criteria,
                pageable.getSort());
        TypedQuery<Topic> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Topic> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, TopicResponseRepresentation.class));
    }

    @Transactional
    public TopicResponseRepresentation newTopic(@NotNull TopicRequestRepresentation topicRequestRepresentation) {
        topicRepository.findByCaption(topicRequestRepresentation.getCaption())
            .ifPresent(topic -> {
                throw new TopicAlreadyExistsException(topic);
            });
        Topic topic = modelMapper.map(topicRequestRepresentation, Topic.class);
        Topic saved = topicRepository.save(topic);

        eventPublisher.publishEvent(new TopicCreatedEvent(this, saved.getId()));
        return modelMapper.map(saved, TopicResponseRepresentation.class);
    }

    @Transactional
    public TopicResponseRepresentation updateTopic(@NotNull Long topicId,
                                                   @NotNull TopicRequestRepresentation blogTopic)
    {
        return topicRepository.findById(topicId)
            .map(found -> {
                found.setCaption(blogTopic.getCaption());
                Topic saved = topicRepository.save(found);
                eventPublisher.publishEvent(new TopicUpdatedEvent(this, saved.getId()));
                return modelMapper.map(saved, TopicResponseRepresentation.class);
            })
            .orElseThrow(() -> {
                throw new TopicNotFoundException(topicId);
            });
    }

    @Transactional
    public void deleteTopic(@NotNull Long topicId) {
        topicRepository.deleteById(topicId);
        eventPublisher.publishEvent(new TopicDeletedEvent(this, topicId));
    }
}
