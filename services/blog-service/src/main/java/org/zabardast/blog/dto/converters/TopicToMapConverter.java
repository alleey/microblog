package org.zabardast.blog.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.blog.controllers.TopicsController;
import org.zabardast.blog.model.Topic;

public class TopicToMapConverter implements Converter<Topic, Map<String, Object>> {

    public static final String ATTR_ID = "topicId";
    public static final String ATTR_NAME = "name";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, Object> convert(MappingContext<Topic, Map<String, Object>> context) {
        Topic s = context.getSource();
        Map<String, Object> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, Long.toString(s.getId()),
            ATTR_NAME, s.getCaption(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(TopicsController.class).getTopicById(s.getId())).toString()
        ));
        return d;
    }
}
