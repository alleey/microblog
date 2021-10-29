package org.zabardast.followers.dto.assemblers;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.followers.controllers.FollowersController;
import org.zabardast.followers.controllers.FollowingController;
import org.zabardast.followers.dto.FollowResponseRepresentation;

@Component
public class FollowResponseRepresentationAssembler implements
        RepresentationModelAssembler<FollowResponseRepresentation, EntityModel<FollowResponseRepresentation>>
{
    @Override
    public EntityModel<FollowResponseRepresentation> toModel(FollowResponseRepresentation follows) {
        return EntityModel.of(
            follows,
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder
                    .methodOn(FollowingController.class)
                    .getOne(follows.getFollowerId(), follows.getUserId())
            ).withSelfRel(),
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder
                    .methodOn(FollowingController.class)
                    .getAlLFollowing(follows.getFollowerId(), Pageable.unpaged())
            ).withRel("following"),
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder
                    .methodOn(FollowersController.class)
                    .getAlLFollowers(follows.getFollowerId(), Pageable.unpaged())
            ).withRel("followers")
        );
    }
}
