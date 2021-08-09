package org.zabardast.blog.controllers.guards;

import org.zabardast.blog.model.Post;
import org.zabardast.blog.services.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.blog.services.exceptions.PostNotFoundException;

@Slf4j
@Component
public class PostOwnership {
    @Autowired PostService postService;

    public boolean require(Long postId, Authentication authentication) {
        Post post = postService.getPost(postId);
        if(post == null)
            throw new PostNotFoundException(postId);
        return post.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
