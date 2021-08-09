package org.zabardast.blog.services;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageImpl;
import org.zabardast.blog.dto.TopicRepresentation;
import org.zabardast.blog.events.TopicCreatedEvent;
import org.zabardast.blog.events.TopicDeletedEvent;
import org.zabardast.blog.events.TopicUpdatedEvent;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.repository.TopicRepository;
import org.zabardast.blog.services.exceptions.TopicAlreadyExistsException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class TopicService
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired TopicRepository topicRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public Topic findOne(@NotNull Long topicId) {
        return topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFoundException(topicId));
    }

    @Transactional
    public Page<Topic> getAllTopics(@NotNull Pageable page) {
        return topicRepository.findAll(page);
    }

    @Transactional
    public Page<Topic> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Topic> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Topic.class,
                criteria,
                pageable.getSort());
        TypedQuery<Topic> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Topic> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result;
    }

    @Transactional
    public Topic newTopic(@NotNull TopicRepresentation topicRepresentation) {
        topicRepository.findByCaption(topicRepresentation.getCaption())
            .ifPresent(topic -> {
                throw new TopicAlreadyExistsException(topic);
            });
        Topic topic = modelMapper.map(topicRepresentation, Topic.class);
        Topic saved = topicRepository.save(topic);

        eventPublisher.publishEvent(new TopicCreatedEvent(this, saved));
        return saved;
    }

    @Transactional
    public Topic updateTopic(@NotNull Long topicId, @NotNull TopicRepresentation blogTopic) {
        return topicRepository.findById(topicId)
            .map(found -> {
                found.setCaption(blogTopic.getCaption());
                Topic saved = topicRepository.save(found);
                eventPublisher.publishEvent(new TopicUpdatedEvent(this, saved));
                return saved;
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
