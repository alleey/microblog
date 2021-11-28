package org.zabardast.blog.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.zabardast.blog.model.Comment;

public class CommentToMapConverter implements Converter<Comment, Map<String, String>> {

    public static final String ATTR_ID = "commentId";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<Comment, Map<String, String>> context) {
        Comment s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, Long.toString(s.getId()),
            ATTR_OWNER, s.getOwner()
        ));
        return d;
    }
}
