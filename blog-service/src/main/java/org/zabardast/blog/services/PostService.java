package org.zabardast.blog.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.blog.dto.PostRepresentation;
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
public class PostService
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
    public Post getPost(Long postId) {
        return postRepository
                .findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
    }

    public void test() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Post> query = builder.createQuery(Post.class);
        Root<Post> root = query.from(Post.class);

    }

    @Transactional
    public Page<Post> getOwnerPosts(@NotNull String ownerId, @NotNull Pageable page) {
        return postRepository.findByOwner(ownerId, page);
    }

    @Transactional
    public Page<Post> getAllPosts(@NotNull Pageable page) {
        return postRepository.findAll(page);
    }

    @Transactional
    public Page<Post> getTopicPosts(Long topicId, Pageable page) {
        return topicRepository.findById(topicId)
                .map(entity -> {
                    return postRepository.findAllByTopics(entity, page);
                })
                .orElseThrow(() -> {
                    throw new TopicNotFoundException(topicId);
                });
    }

    @Transactional
    public Page<Post> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Post> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Post.class,
                criteria,
                pageable.getSort());
        TypedQuery<Post> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Post> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result;
    }

    @Transactional
    public Post newPost(@NotNull String ownerId, @NotNull PostRepresentation postRepresentation) {

        postRepository.findBySlug(postRepresentation.getSlug())
                .ifPresent(post -> {
                    throw new PostAlreadyExistsException(post);
                });
        Post post = modelMapper.map(postRepresentation, Post.class);
        post.setOwner(ownerId);
        post.setCreatedOn(new Date());
        Post saved = postRepository.save(post);

        eventPublisher.publishEvent(new PostCreatedEvent(this, saved));
        return saved;
    }

    @Transactional
    public Post updatePost(@NotNull Long postId, @NotNull PostRepresentation postRepresentation) {
        return postRepository.findById(postId)
            .map(found -> {
                found.setUpdatedOn(new Date());
                found.setSlug(postRepresentation.getSlug());
                found.setTitle(postRepresentation.getTitle());
                found.setText(postRepresentation.getText());
                Post saved = postRepository.save(found);

                eventPublisher.publishEvent(new PostUpdatedEvent(this, saved));
                return saved;
            })
            .orElseThrow(() -> {
                throw new PostNotFoundException(postId);
            });
    }

    @Transactional
    public void deletePost(@NotNull Long postId) {
        postRepository.deleteById(postId);
        eventPublisher.publishEvent(new PostDeletedEvent(this, postId));
    }

    @Transactional
    public void resetTopics(@NotNull Long postId, @NotNull List<Topic> topics) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    throw new PostNotFoundException(postId);
                });
        post.setTopics(new HashSet<Topic>(topics));
        postRepository.save(post);
    }

    @Transactional
    public Topic assignTopic(@NotNull Long postId, @NotNull Topic topic) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    throw new PostNotFoundException(postId);
                });
        post.getTopics().add(topic);
        postRepository.save(post);
        return topic;
    }

    @Transactional
    public void unassignTopic(@NotNull Long postId, @NotNull Topic topic) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    throw new PostNotFoundException(postId);
                });
        post.getTopics().remove(topic);
        postRepository.save(post);
    }
}
