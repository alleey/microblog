package org.zabardast.userprofile.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.userprofile.controllers.UserProfilesController;
import org.zabardast.userprofile.model.UserProfile;

public class UserProfileToMapConverter implements Converter<UserProfile, Map<String, String>> {

    public static final String ATTR_ID = "userId";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<UserProfile, Map<String, String>> context) {
        UserProfile s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, s.getId(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(UserProfilesController.class)
                                .getUserProfileById(s.getId())).toString()
        ));
        return d;
    }
}
