package org.zabardast.resources.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.ResourceKey;
import org.zabardast.resources.services.ResourceService;

@Slf4j
@Component
public class ResourceOwnership {
    @Autowired
    ResourceService resourceService;

    public boolean require(String resourceId, String folder, Authentication authentication) {
        ResourceResponseRepresentation resource = resourceService.getResource(new ResourceKey(resourceId, folder));
        return resource.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
