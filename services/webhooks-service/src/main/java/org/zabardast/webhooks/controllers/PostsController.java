package org.zabardast.webhooks.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.webhooks.dto.EventHandlerRequestRepresentation;
import org.zabardast.webhooks.dto.EventHandlerResponseRepresentation;
import org.zabardast.webhooks.dto.assemblers.PostResponseRepresentationAssembler;
import org.zabardast.webhooks.services.EventHandlerService;
import org.zabardast.common.filtering.Filter;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/eventHandlers")
@Relation(collectionRelation = "eventHandlers")
@Validated
public class PostsController {

    @Autowired
    EventHandlerService eventHandlerService;

    @Autowired
    PagedResourcesAssembler<EventHandlerResponseRepresentation> pagedAssembler;

    @Autowired
    PostResponseRepresentationAssembler assembler;

    @GetMapping()
    public ResponseEntity<?> getAll(@NotNull final Pageable page) {

        PagedModel<?> entities = pagedAssembler.toModel(
            eventHandlerService.getAllPosts(page),
            assembler
        );

        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
    }

    @GetMapping("search")
    public ResponseEntity<?> search(@NotBlank @RequestParam("q") final String criteria, final Pageable page) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
            Filter filter = mapper.readValue(criteria, Filter.class);

            PagedModel<?> entities = pagedAssembler.toModel(
                eventHandlerService.getAllFiltered(filter, page),
                assembler
            );
            return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
        } catch (JsonProcessingException e) {
            log.error(e.toString());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "{postId}")
    public ResponseEntity<?> getPostById(@PathVariable("postId") long postId) {

        return ResponseEntity
            .ok()
            .contentType(MediaTypes.HAL_JSON)
            .body(assembler.toModel(eventHandlerService.getPost(postId)));
    }

    @PostMapping()
    public ResponseEntity<?> newPost(@RequestBody EventHandlerRequestRepresentation webhooksPost,
                                     @NotNull Authentication authentication) {

        EntityModel<?> entity = assembler.toModel(
            eventHandlerService.newPost(authentication.getName(), webhooksPost)
        );
        return ResponseEntity.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entity);
    }

    @PutMapping(value = "{postId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
    public ResponseEntity<?> updatePost(
        @PathVariable long postId,
        @RequestBody EventHandlerRequestRepresentation webhooksPost,
        @NotNull Authentication authentication) {

        EntityModel<?> entity = assembler.toModel(
            eventHandlerService.updatePost(postId, webhooksPost)
        );
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "{postId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
    public ResponseEntity<?> deletePost(
        @PathVariable long postId,
        @NotNull Authentication authentication) {

        eventHandlerService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
