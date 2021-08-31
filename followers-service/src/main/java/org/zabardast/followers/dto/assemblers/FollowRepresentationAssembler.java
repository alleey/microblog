package org.zabardast.followers.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import org.zabardast.followers.dto.FollowResponseRepresentation;

@Component
public class FollowRepresentationAssembler implements
        RepresentationModelAssembler<FollowResponseRepresentation, EntityModel<FollowResponseRepresentation>>
{
    @Override
    public EntityModel<FollowResponseRepresentation> toModel(FollowResponseRepresentation follower) {
        return EntityModel.of(
            follower
        );
    }
}
