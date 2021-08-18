package org.zabardast.followers.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import org.zabardast.followers.dto.FollowerResponseRepresentation;

@Component
public class FollowerRepresentationAssembler implements
        RepresentationModelAssembler<FollowerResponseRepresentation, EntityModel<FollowerResponseRepresentation>>
{
    @Override
    public EntityModel<FollowerResponseRepresentation> toModel(FollowerResponseRepresentation follower) {
        return EntityModel.of(
            follower
        );
    }

}
