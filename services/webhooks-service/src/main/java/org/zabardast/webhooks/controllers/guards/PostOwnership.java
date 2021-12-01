package org.zabardast.webhooks.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.webhooks.dto.EventHandlerResponseRepresentation;
import org.zabardast.webhooks.services.EventHandlerService;
import org.zabardast.webhooks.services.exceptions.PostNotFoundException;

@Slf4j
@Component
public class PostOwnership {
    @Autowired
    EventHandlerService eventHandlerService;

    public boolean require(Long postId, Authentication authentication) {

        EventHandlerResponseRepresentation post = eventHandlerService.getPost(postId);
        if (post == null)
            throw new PostNotFoundException(postId);
        return post.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
