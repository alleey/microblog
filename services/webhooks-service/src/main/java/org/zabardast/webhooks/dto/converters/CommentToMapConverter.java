package org.zabardast.webhooks.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.zabardast.webhooks.model.EventTransformation;

public class CommentToMapConverter implements Converter<EventTransformation, Map<String, Object>> {

    public static final String ATTR_ID = "commentId";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, Object> convert(MappingContext<EventTransformation, Map<String, Object>> context) {
        EventTransformation s = context.getSource();
        Map<String, Object> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, Long.toString(s.getId()),
            ATTR_OWNER, s.getOwner()
        ));
        return d;
    }
}
