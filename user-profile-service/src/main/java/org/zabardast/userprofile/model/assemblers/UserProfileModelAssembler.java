package org.zabardast.userprofile.model.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.userprofile.controllers.UserProfilesController;
import org.zabardast.userprofile.model.UserProfile;

@Component
public class UserProfileModelAssembler implements RepresentationModelAssembler<UserProfile, EntityModel<UserProfile>> {
    @Override
    public EntityModel<UserProfile> toModel(UserProfile userProfile) {
        return EntityModel.of(
            userProfile,
            WebMvcLinkBuilder.linkTo(UserProfilesController.class).slash(userProfile.getId()).withSelfRel()
        );
    }

}
