package org.zabardast.blog.controllers.guards;

import org.zabardast.blog.model.Comment;
import org.zabardast.blog.services.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.blog.services.exceptions.PostNotFoundException;

@Slf4j
@Component
public class CommentOwnership {
    @Autowired CommentService commentService;

    public boolean require(Long postId, Long commentId, Authentication authentication) {
        Comment comment = commentService.getPostComment(postId, commentId);
        if(comment == null)
            throw new PostNotFoundException(postId);
        return comment.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
