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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.events.EventFactory;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.repository.PostRepository;
import org.zabardast.blog.repository.TopicRepository;
import org.zabardast.blog.services.exceptions.PostAlreadyExistsException;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;

@Service
public class PostService {
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
    public PostResponseRepresentation getPost(Long postId) {

        return postRepository
            .findById(postId)
            .map(i -> modelMapper.map(i, PostResponseRepresentation.class))
            .orElseThrow(() -> new PostNotFoundException(postId));
    }

    @Transactional
    public Page<PostResponseRepresentation> getOwnerPosts(@NotNull String principal, @NotNull Pageable page) {

        return postRepository
            .findByOwner(principal, page)
            .map(i -> modelMapper.map(i, PostResponseRepresentation.class));
    }

    @Transactional
    public Page<PostResponseRepresentation> getAllPosts(@NotNull Pageable page) {

        return postRepository
            .findAll(page)
            .map(i -> modelMapper.map(i, PostResponseRepresentation.class));
    }

    @Transactional
    public Page<PostResponseRepresentation> getTopicPosts(Long topicId, Pageable page) {

        return topicRepository.findById(topicId)
            .map(entity -> {
                return postRepository
                    .findAllByTopics(entity, page)
                    .map(i -> modelMapper.map(i, PostResponseRepresentation.class));
            })
            .orElseThrow(() -> {
                throw new TopicNotFoundException(topicId);
            });
    }

    @Transactional
    public Page<PostResponseRepresentation> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Post> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
            Post.class,
            criteria,
            pageable.getSort());
        TypedQuery<Post> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Post> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, PostResponseRepresentation.class));
    }

    @Transactional
    public PostResponseRepresentation newPost(@NotNull String ownerId, @NotNull PostRequestRepresentation requestRepresentation) {

        postRepository.findBySlug(requestRepresentation.getSlug())
            .ifPresent(post -> {
                throw new PostAlreadyExistsException(post);
            });

        Post post = modelMapper.map(requestRepresentation, Post.class);
        post.setOwner(ownerId);
        post.setCreatedOn(new Date());
        if(requestRepresentation.getTopics() != null && requestRepresentation.getTopics().size() > 0) {
            List<Topic> topics = requestRepresentation
                .getTopics()
                .stream()
                .map(i -> topicRepository.findById(i).orElseThrow(() -> new TopicNotFoundException(i)))
                .collect(Collectors.toList());
            post.setTopics(new HashSet<Topic>(topics));
        }

        Post saved = postRepository.save(post);
        eventPublisher.publishEvent(eventFactory.postCreated(this, saved));
        return modelMapper.map(saved, PostResponseRepresentation.class);
    }

    @Transactional
    public PostResponseRepresentation updatePost(@NotNull Long postId,
                                                 @NotNull PostRequestRepresentation requestRepresentation) {

        return postRepository.findById(postId)
            .map(found -> {
                found.setUpdatedOn(new Date());
                found.setSlug(requestRepresentation.getSlug());
                found.setTitle(requestRepresentation.getTitle());
                found.setText(requestRepresentation.getText());

                if(requestRepresentation.getTopics() != null && requestRepresentation.getTopics().size() > 0) {
                    List<Topic> topics = requestRepresentation
                        .getTopics()
                        .stream()
                        .map(i -> topicRepository.findById(i).orElseThrow(() -> new TopicNotFoundException(i)))
                        .collect(Collectors.toList());
                    found.setTopics(new HashSet<Topic>(topics));
                }

                Post saved = postRepository.save(found);
                eventPublisher.publishEvent(eventFactory.postUpdated(this, saved));
                return modelMapper.map(saved, PostResponseRepresentation.class);
            })
            .orElseThrow(() -> {
                throw new PostNotFoundException(postId);
            });
    }

    @Transactional
    public void deletePost(@NotNull Long postId) {

        postRepository.deleteById(postId);
        eventPublisher.publishEvent(eventFactory.postDeleted(this, postId));
    }
}
