package org.zabardast.resources.dto.assemblers;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.resources.controllers.ResourceController;
import org.zabardast.resources.dto.ResourceResponseRepresentation;

@Component
public class ResourceResponseRepresentationAssembler implements
        RepresentationModelAssembler<ResourceResponseRepresentation, EntityModel<ResourceResponseRepresentation>> {
    @Override
    public EntityModel<ResourceResponseRepresentation> toModel(ResourceResponseRepresentation resource) {
        return EntityModel.of(
            resource,
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(ResourceController.class).getResource(resource.getResource(), resource.getKey())
            ).withSelfRel(),
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(ResourceController.class).downloadResource(resource.getResource(), resource.getKey())
            ).withRel("download"),
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(ResourceController.class).getResources(resource.getResource(), Pageable.unpaged())
            ).withRel("resources")
//            WebMvcLinkBuilder.linkTo(ResourceController.class)
//                    .slash(resource.getResource())
//                    .slash(resource.getKey())
//                    .withSelfRel()
        );
    }

}
