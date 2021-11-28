package org.zabardast.resources.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.resources.controllers.ResourceController;
import org.zabardast.resources.model.Resource;

public class ResourceToMapConverter implements Converter<Resource, Map<String, String>> {

    public static final String ATTR_RESOURCE = "resource";
    public static final String ATTR_KEY = "key";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<Resource, Map<String, String>> context) {
        Resource s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_RESOURCE, s.getResource(),
            ATTR_KEY, s.getKey(),
            ATTR_OWNER, s.getOwner(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(ResourceController.class)
                        .getResource(s.getResource(), s.getKey())).toString()
        ));
        return d;
    }
}
