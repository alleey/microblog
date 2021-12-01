package org.zabardast.webhooks.events;

import java.util.Date;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.webhooks.dto.converters.CommentToMapConverter;
import org.zabardast.webhooks.dto.converters.PostToMapConverter;
import org.zabardast.webhooks.dto.converters.TopicToMapConverter;
import org.zabardast.webhooks.model.EventTransformation;
import org.zabardast.webhooks.model.Event;
import org.zabardast.webhooks.model.EventHandler;
import org.zabardast.webhooks.model.WebHook;
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
    Tracer tracer;

    @PostConstruct
    public void init() {

        modelMapper.addConverter(new PostToMapConverter());
        modelMapper.addConverter(new CommentToMapConverter());
        modelMapper.addConverter(new TopicToMapConverter());
    }

    public PostCreatedEvent postCreated(Object source, @NotNull EventHandler eventHandler) {

        return new PostCreatedEvent(source, modelMapper.map(eventHandler, Map.class));
    }

    public PostUpdatedEvent postUpdated(Object source, @NotNull EventHandler eventHandler) {

        return new PostUpdatedEvent(source, modelMapper.map(eventHandler, Map.class));
    }

    public PostDeletedEvent postDeleted(Object source, @NotNull Long postId) {

        return new PostDeletedEvent(source,
            Map.of(PostToMapConverter.ATTR_ID, Long.toString(postId))
        );
    }

    public CommentCreatedEvent commentCreated(Object source, @NotNull Long postId, @NotNull EventTransformation eventTransformation) {

        Map map = mapCommentCommon(postId, eventTransformation);
        return new CommentCreatedEvent(source, map);
    }

    public CommentUpdatedEvent commentUpdated(Object source, @NotNull Long postId, @NotNull EventTransformation eventTransformation) {

        Map map = mapCommentCommon(postId, eventTransformation);
        return new CommentUpdatedEvent(source, map);
    }

    public CommentDeletedEvent commentDeleted(Object source, @NotNull Long postId, @NotNull Long commentId) {

        return new CommentDeletedEvent(source,
            Map.of(PostToMapConverter.ATTR_ID, Long.toString(postId), CommentToMapConverter.ATTR_ID, Long.toString(commentId)));
    }

    public TopicCreatedEvent topicCreated(Object source, @NotNull WebHook topic) {

        return new TopicCreatedEvent(source, modelMapper.map(topic, Map.class));
    }

    public TopicUpdatedEvent topicUpdated(Object source, @NotNull WebHook topic) {

        return new TopicUpdatedEvent(source, modelMapper.map(topic, Map.class));
    }

    public TopicDeletedEvent topicDeleted(Object source, @NotNull Long topicId) {

        return new TopicDeletedEvent(source,
            Map.of(PostToMapConverter.ATTR_ID, Long.toString(topicId))
        );
    }

    public Event domainEvent(BaseEvent event) {

        if (event.getPrincipal() == null)
            event.setPrincipal(serviceSecurityContextProvider.getPrincipalName());

        return Event.builder()
            .instant(new Date())
            .type(event.getClass().getName())
            .principal(event.getPrincipal())
            //.traceId(tracer.currentSpan().context().traceId())
            .payload(JsonUtils.mapToJson(event.attributes()))
            .build();
    }

    private Map mapCommentCommon(@NotNull Long postId, @NotNull EventTransformation eventTransformation) {

        Map map = modelMapper.map(eventTransformation, Map.class);
        map.put(PostToMapConverter.ATTR_ID, postId);
        map.put(CommentToMapConverter.ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
            .getCommentById(postId, eventTransformation.getId())).toString());
        return map;
    }
}
