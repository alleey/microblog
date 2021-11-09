package org.zabardast.resources.services;

import java.util.Date;
import java.util.function.Consumer;
import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.resources.dto.ResourceRequestRepresentation;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.events.ResourceCreatedEvent;
import org.zabardast.resources.events.ResourceDeletedEvent;
import org.zabardast.resources.events.ResourceUpdatedEvent;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.model.ResourceKey;
import org.zabardast.resources.repository.ResourceRepository;
import org.zabardast.resources.services.exceptions.ResourceNotFoundException;

@Service
public class ResourceService 
{
    @Autowired
    @Qualifier("transactionOutboxPublisher")
    EventPublisher eventPublisher;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    ModelMapper modelMapper;

    @PostConstruct
    public void init() {
        Converter<?,?> converter = new Converter<Resource, ResourceResponseRepresentation>()
        {
            public ResourceResponseRepresentation convert(MappingContext<Resource, ResourceResponseRepresentation> context)
            {
                Resource s = context.getSource();
                ResourceResponseRepresentation d = context.getDestination();

                if(d == null)
                    d = new ResourceResponseRepresentation();

                d.setKey(s.getKey());
                d.setResource(s.getResource());
                d.setOwner(s.getOwner());
                d.setContentType(s.getContentType());
                d.setContentLocation(s.getContentLocation());
                d.setCreatedOn(s.getCreatedOn());
                d.setUpdatedOn(s.getUpdatedOn());

//                ResourceKey key = new ResourceKey(s.getResource(), s.getFolder(), s.getOwner());
//                d.setContents(storageService.load(key));
                return d;
            }
        };
        modelMapper.addConverter(converter);
    }

    @Transactional
    public ResourceResponseRepresentation getResource(@NotNull ResourceKey key)
    {
        Resource resource = resourceRepository
                .findById(key)
                .orElseThrow(() -> new ResourceNotFoundException(key));
        ResourceResponseRepresentation response = modelMapper.map(resource, ResourceResponseRepresentation.class);
        return response;
    }

    @Transactional
    public Page<ResourceResponseRepresentation> findByOwner(String ownerId, Pageable pageable)
    {
        return resourceRepository
                .findByOwner(ownerId, pageable)
                .map(i -> modelMapper.map(i, ResourceResponseRepresentation.class));
    }

    @Transactional
    public Page<ResourceResponseRepresentation> findByResource(String folder, Pageable pageable)
    {
        return resourceRepository
                .findByResource(folder, pageable)
                .map(i -> modelMapper.map(i, ResourceResponseRepresentation.class));
    }

    @Transactional
    public Page<ResourceResponseRepresentation> findByOwnerAndResource(String resource, String owner, Pageable pageable) {
        return resourceRepository
                .findByResourceAndOwner(resource, owner, pageable)
                .map(i -> modelMapper.map(i, ResourceResponseRepresentation.class));
    }

    @Transactional
    public ResourceResponseRepresentation newResource(@NotNull String owner,
                                                      @NotNull ResourceKey key,
                                                      @NotNull ResourceRequestRepresentation request,
                                                      @NotNull Consumer<ResourceResponseRepresentation> continuation)
    {
        Resource resource = Resource.builder()
                .resource((key.getResource()))
                .key(key.getKey())
                .owner(owner)
                .contentType(request.getContentType())
                .contentLocation(request.getLocation())
                .createdOn(new Date())
                .build();
        Resource saved = resourceRepository.save(resource);
        ResourceResponseRepresentation response = modelMapper.map(saved, ResourceResponseRepresentation.class);
        if(continuation != null)
            continuation.accept(response);
        eventPublisher.publishEvent(new ResourceCreatedEvent(this, key));
        return response;
    }

    @Transactional
    public ResourceResponseRepresentation updateResource(@NotNull String owner,
                                                         @NotNull ResourceKey key,
                                                         @NotNull ResourceRequestRepresentation request,
                                                         @NotNull Consumer<ResourceResponseRepresentation> continuation)
    {
        return resourceRepository.findById(key)
                .map(found -> {

                    found.setContentType(request.getContentType());
                    found.setContentLocation(request.getLocation());
                    found.setUpdatedOn(new Date());
                    found.setOwner(owner);

                    Resource saved = resourceRepository.save(found);
                    ResourceResponseRepresentation response = modelMapper.map(saved, ResourceResponseRepresentation.class);

                    if(continuation != null)
                        continuation.accept(response);

                    eventPublisher.publishEvent(new ResourceUpdatedEvent(this, key));
                    return response;
                })
                .orElseGet(() -> {
                    return newResource(owner, key, request, continuation);
                });
    }

    @Transactional
    public void deleteResource(@NotNull ResourceKey key,
                               @NotNull Consumer<ResourceKey> continuation) {
        if(resourceRepository.existsById(key)) {
            resourceRepository.deleteById(key);
            if(continuation != null)
                continuation.accept(key);
            eventPublisher.publishEvent(new ResourceDeletedEvent(this, key));
        }
    }
}
