package org.zabardast.blog.services;

import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.zabardast.blog.dto.CommentRepresentation;
import org.zabardast.blog.events.CommentCreatedEvent;
import org.zabardast.blog.events.CommentDeletedEvent;
import org.zabardast.blog.events.CommentUpdatedEvent;
import org.zabardast.blog.events.PostCreatedEvent;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.repository.CommentRepository;
import org.zabardast.blog.repository.PostRepository;
import org.zabardast.blog.services.exceptions.CommentNotFoundException;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.EventPublisher;

@Service
public class CommentService
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public Comment getPostComment(Long postId, Long commentId) {
        return postRepository.findById(postId)
            .map(post -> {
                return commentRepository.findByPostAndId(post, commentId)
                    .map(found -> {
                        found.setPost(post);
                        return found;
                    })
                    .orElseThrow(() -> new CommentNotFoundException(commentId));
            })
            .orElseThrow(() -> {
                throw new PostNotFoundException(postId);
            });
    }

    @Transactional
    public Page<Comment> getPostComments(@NotNull Long postId, @NotNull Pageable page) {
        return postRepository.findById(postId)
            .map(entity -> {
                return commentRepository.findAllByPost(entity, page);
            })
            .orElseThrow(() -> {
                throw new PostNotFoundException(postId);
            });
    }

    @Transactional
    public Comment newComment(@NotNull Long postId, @NotNull String ownerId, @NotNull CommentRepresentation commentRepresentation) {
        return postRepository.findById(postId)
            .map(post -> {
                Comment comment = modelMapper.map(commentRepresentation, Comment.class);
                comment.setUpdatedOn(new Date());
                comment.setPost(post);
                comment.setOwner(ownerId);
                comment.setCreatedOn(new Date());
                post.getComments().add(comment);

                Comment saved = commentRepository.save(comment);
                eventPublisher.publishEvent(new CommentCreatedEvent(this, saved));
                return saved;
            })
            .orElseThrow(() -> {
                throw new PostNotFoundException(postId);
            });
    }

    @Transactional
    public Comment updateComment(@NotNull Long postId, @NotNull Long commentId, @NotNull CommentRepresentation commentRepresentation) {
        Comment found = getPostComment(postId, commentId);
        found.setUpdatedOn(new Date());
        found.setText(commentRepresentation.getText());

        Comment saved = commentRepository.save(found);
        eventPublisher.publishEvent(new CommentUpdatedEvent(this, saved));
        return saved;
    }

    @Transactional
    public void deleteComment(@NotNull Long postId, @NotNull Long commentId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    throw new PostNotFoundException(postId);
                });
        commentRepository.deleteByPostAndId(post, commentId);
        eventPublisher.publishEvent(new CommentDeletedEvent(this, commentId));
    }
}
