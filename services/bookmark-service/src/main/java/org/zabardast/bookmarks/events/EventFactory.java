package org.zabardast.bookmarks.events;

import java.util.Date;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.stereotype.Component;
import org.zabardast.bookmarks.dto.converters.BookmarkToMapConverter;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.model.Event;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.services.ServiceSecurityContextProvider;
import org.zabardast.common.utils.JsonUtils;

@Component
public class EventFactory {

    @Autowired
    ServiceSecurityContextProvider serviceSecurityContextProvider;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private Tracer tracer;

    @PostConstruct
    public void init() {
        modelMapper.addConverter(new BookmarkToMapConverter());
    }

    public BookmarkCreatedEvent bookmarkCreated(Object source, @NotNull Bookmark bookmark) {
        return new BookmarkCreatedEvent(source, modelMapper.map(bookmark,  Map.class));
    }

    public BookmarkUpdatedEvent bookmarkUpdated(Object source, @NotNull Bookmark bookmark) {
        return new BookmarkUpdatedEvent(source, modelMapper.map(bookmark,  Map.class));
    }

    public BookmarkDeletedEvent bookmarkDeleted(Object source, @NotNull Long bookmarkId) {
        return new BookmarkDeletedEvent(source,
            Map.of(BookmarkToMapConverter.ATTR_ID, Long.toString(bookmarkId))
        );
    }

    public Event domainEvent(BaseEvent event) {

        if(event.getPrincipal() == null)
            event.setPrincipal(serviceSecurityContextProvider.getPrincipalName());

        return Event.builder()
                .instant(new Date())
                .type(event.getClass().getName())
                .principal(event.getPrincipal())
                //.traceId(tracer.currentSpan().context().traceId())
                .payload(JsonUtils.toJson(event.attributes()))
                .build();
    }
}
