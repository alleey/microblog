package org.zabardast.bookmarks.dto.converters;

import java.util.HashMap;
import java.util.Map;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.zabardast.bookmarks.controllers.BookmarksController;
import org.zabardast.bookmarks.model.Bookmark;

public class BookmarkToMapConverter implements Converter<Bookmark, Map<String, String>> {

    public static final String ATTR_ID = "bookmarkId";
    public static final String ATTR_OWNER = "owner";
    public static final String ATTR_REF = "ref";

    @Override
    public Map<String, String> convert(MappingContext<Bookmark, Map<String, String>> context) {
        Bookmark s = context.getSource();
        Map<String, String> d = context.getDestination();

        if(d == null)
            d = new HashMap<>();

        d.putAll(Map.of(
            ATTR_ID, Long.toString(s.getId()),
            ATTR_OWNER, s.getOwner(),
            ATTR_REF, WebMvcLinkBuilder.linkTo(BookmarksController.class).slash(s.getId()).toString()
        ));
        return d;
    }
}
