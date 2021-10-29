package org.zabardast.userprofile.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.userprofile.controllers.UserProfilesController;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;

@Component
public class UserProfileResponseRepresentationAssembler implements
        RepresentationModelAssembler<UserProfileResponseRepresentation, EntityModel<UserProfileResponseRepresentation>> {
    @Override
    public EntityModel<UserProfileResponseRepresentation> toModel(UserProfileResponseRepresentation userProfile) {
        return EntityModel.of(
            userProfile,
            WebMvcLinkBuilder.linkTo(UserProfilesController.class).slash(userProfile.getId()).withSelfRel()
        );
    }
}
