package org.zabardast.stats.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.stats.controllers.CounterController;
import org.zabardast.stats.model.Counter;

public class CounterToMapConverter implements Converter<Counter, Map<String, String>> {

    public static final String ATTR_ID = "counterId";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<Counter, Map<String, String>> context) {
        Counter s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, s.getCounter(),
            ATTR_OWNER, s.getOwner(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(CounterController.class).slash(s.getCounter()).toString()
        ));
        return d;
    }
}
