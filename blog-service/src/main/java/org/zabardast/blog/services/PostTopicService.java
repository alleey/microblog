package org.zabardast.blog.services;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.events.PostCreatedEvent;
import org.zabardast.blog.events.PostDeletedEvent;
import org.zabardast.blog.events.PostUpdatedEvent;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.repository.PostRepository;
import org.zabardast.blog.repository.TopicRepository;
import org.zabardast.blog.services.exceptions.PostAlreadyExistsException;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class PostTopicService
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    PostRepository postRepository;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public void resetTopics(@NotNull Long postId, @NotNull List<Long> topicIds) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
        List<Topic> topics = topicIds.stream()
                .map(i -> topicRepository.findById(i).orElseThrow(() -> new TopicNotFoundException(i)))
                .collect(Collectors.toList());

        post.setTopics(new HashSet<Topic>(topics));
        postRepository.save(post);
    }

    @Transactional
    public Topic assignTopic(@NotNull Long postId, @NotNull Long topicId) {

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFoundException(topicId));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));

        post.getTopics().add(topic);
        postRepository.save(post);
        return topic;
    }

    @Transactional
    public void unassignTopic(@NotNull Long postId, @NotNull Long topicId) {

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFoundException(topicId));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));

        post.getTopics().remove(topic);
        postRepository.save(post);
    }
}
