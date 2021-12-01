package org.zabardast.blog.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.blog.controllers.PostsController;
import org.zabardast.blog.model.Post;

public class PostToMapConverter implements Converter<Post, Map<String, Object>> {

    public static final String ATTR_ID = "postId";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, Object> convert(MappingContext<Post, Map<String, Object>> context) {

        Post s = context.getSource();
        Map<String, Object> d = context.getDestination();

        if (d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, Long.toString(s.getId()),
            ATTR_OWNER, s.getOwner(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostsController.class).getPostById(s.getId())).toString(),
            "topics", s.getTopics()
        ));
        return d;
    }
}
