package org.zabardast.followers.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.followers.controllers.FollowingController;
import org.zabardast.followers.model.Following;

public class FollowingToMapConverter implements Converter<Following, Map<String, String>> {

    public static final String ATTR_ID = "userId";
    public static final String ATTR_FOLLOWER = "followerId";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<Following, Map<String, String>> context) {
        Following s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, s.getUser(),
            ATTR_FOLLOWER, s.getFollower(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(FollowingController.class)
                        .getOne(s.getFollower(), s.getUser())).toString()
        ));
        return d;
    }
}
