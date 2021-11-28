package org.zabardast.blog.services;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.blog.events.EventFactory;
import org.zabardast.blog.events.PostUpdatedEvent;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.repository.PostRepository;
import org.zabardast.blog.repository.TopicRepository;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class PostTopicService
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
        Post saved = postRepository.save(post);
        eventPublisher.publishEvent(eventFactory.postUpdated(this, saved));
    }

    @Transactional
    public Topic assignTopic(@NotNull Long postId, @NotNull Long topicId) {

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFoundException(topicId));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));

        post.getTopics().add(topic);
        Post saved = postRepository.save(post);
        eventPublisher.publishEvent(eventFactory.postUpdated(this, saved));
        return topic;
    }

    @Transactional
    public void unassignTopic(@NotNull Long postId, @NotNull Long topicId) {

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFoundException(topicId));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));

        post.getTopics().remove(topic);
        Post saved = postRepository.save(post);
        eventPublisher.publishEvent(eventFactory.postUpdated(this, saved));
    }
}
