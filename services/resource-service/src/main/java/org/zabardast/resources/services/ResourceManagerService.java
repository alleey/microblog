package org.zabardast.resources.services;

import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.resources.dto.ResourceRequestRepresentation;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.ResourceKey;

@Service
public class ResourceManagerService
{
    @Autowired
    StorageService storageService;

    @Autowired
    ResourceService resourceService;

    public ResourceResponseRepresentation getResource(@NotNull String resource,
                                                      @NotNull String key,
                                                      boolean loadContents)
    {
        ResourceKey rkey = new ResourceKey(resource, key);
        ResourceResponseRepresentation response = resourceService.getResource(rkey);
        if(loadContents) {
            response.setContents(storageService.load(response.getContentLocation()));
        }
        return response;
    }

    public Page<ResourceResponseRepresentation> findByOwner(String ownerId, Pageable pageable)
    {
        return resourceService.findByOwner(ownerId, pageable);
    }

    public Page<ResourceResponseRepresentation> findByResource(String resource, Pageable pageable)
    {
        return resourceService.findByResource(resource, pageable);
    }

    public Page<ResourceResponseRepresentation> findByOwnerAndFolder(String ownerId, String folder, Pageable pageable) {
        return resourceService.findByOwnerAndResource(ownerId, folder, pageable);
    }

    @Transactional
    public ResourceResponseRepresentation newResource(@NotNull String ownerId,
                                                      @NotNull ResourceRequestRepresentation request,
                                                      @NotNull org.springframework.core.io.Resource file)
    {
        ResourceKey rkey = ResourceKey.builder()
                .resource(request.getResource())
                .key(request.getKey())
                .build();
        String moniker = storageService.getResolvableMoniker(rkey);

        request.setLocation(moniker);
        return resourceService.newResource(ownerId, rkey, request, f -> {
            storageService.save(moniker, file);
        });
    }

    public ResourceResponseRepresentation updateResource(@NotNull String ownerId,
                                                         @NotNull ResourceRequestRepresentation request,
                                                         @NotNull org.springframework.core.io.Resource file)
    {
        ResourceKey rkey = ResourceKey.builder()
                .resource(request.getResource())
                .key(request.getKey())
                .build();
        String moniker = storageService.getResolvableMoniker(rkey);

        request.setLocation(moniker);
        return resourceService.updateResource(ownerId, rkey, request, f -> {
            storageService.save(moniker, file);
        });
    }

    public void deleteResource(@NotNull String key, @NotNull String resource)
    {
        ResourceKey rkey = ResourceKey.builder()
                .resource(resource)
                .key(key)
                .build();
        String moniker = storageService.getResolvableMoniker(rkey);

        resourceService.deleteResource(rkey, f -> {
            storageService.delete(moniker);
        });
    }
}
