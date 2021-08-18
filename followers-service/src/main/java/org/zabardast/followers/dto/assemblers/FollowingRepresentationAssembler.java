package org.zabardast.followers.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import org.zabardast.followers.dto.FollowingResponseRepresentation;

@Component
public class FollowingRepresentationAssembler implements
        RepresentationModelAssembler<FollowingResponseRepresentation, EntityModel<FollowingResponseRepresentation>>
{
    @Override
    public EntityModel<FollowingResponseRepresentation> toModel(FollowingResponseRepresentation follower) {
        return EntityModel.of(
            follower
        );
    }
}
