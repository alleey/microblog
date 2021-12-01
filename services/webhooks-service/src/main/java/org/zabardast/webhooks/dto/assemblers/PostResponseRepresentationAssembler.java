package org.zabardast.webhooks.dto.assemblers;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.webhooks.controllers.PostsController;
import org.zabardast.webhooks.dto.EventHandlerResponseRepresentation;

@Component
public class PostResponseRepresentationAssembler implements
    RepresentationModelAssembler<EventHandlerResponseRepresentation, EntityModel<EventHandlerResponseRepresentation>> {
    @Override
    public EntityModel<EventHandlerResponseRepresentation> toModel(EventHandlerResponseRepresentation webhooksPost) {

        return EntityModel.of(
            webhooksPost,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostsController.class)
                    .getPostById(webhooksPost.getId()))
                .withSelfRel(),
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostsController.class)
                    .getAll(Pageable.unpaged()))
                .withRel("/")
        );
    }
}
