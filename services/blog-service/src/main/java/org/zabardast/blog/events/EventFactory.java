package org.zabardast.blog.events;

import java.util.Date;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.blog.controllers.PostCommentsController;
import org.zabardast.blog.dto.converters.CommentToMapConverter;
import org.zabardast.blog.dto.converters.PostToMapConverter;
import org.zabardast.blog.dto.converters.TopicToMapConverter;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Event;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
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
        modelMapper.addConverter(new PostToMapConverter());
        modelMapper.addConverter(new CommentToMapConverter());
        modelMapper.addConverter(new TopicToMapConverter());
    }

    public PostCreatedEvent postCreated(Object source, @NotNull Post post) {
        return new PostCreatedEvent(source, modelMapper.map(post,  Map.class));
    }

    public PostUpdatedEvent postUpdated(Object source, @NotNull Post post) {
        return new PostUpdatedEvent(source, modelMapper.map(post,  Map.class));
    }

    public PostDeletedEvent postDeleted(Object source, @NotNull Long postId) {
        return new PostDeletedEvent(source,
            Map.of(PostToMapConverter.ATTR_ID, Long.toString(postId))
        );
    }

    public CommentCreatedEvent commentCreated(Object source, @NotNull Long postId, @NotNull Comment comment) {
        Map map = mapCommentCommon(postId, comment);
        return new CommentCreatedEvent(source, map);
    }

    public CommentUpdatedEvent commentUpdated(Object source, @NotNull Long postId, @NotNull Comment comment) {
        Map map = mapCommentCommon(postId, comment);
        return new CommentUpdatedEvent(source, map);
    }

    public CommentDeletedEvent commentDeleted(Object source, @NotNull Long postId, @NotNull Long commentId) {
        return new CommentDeletedEvent(source,
                Map.of(PostToMapConverter.ATTR_ID, Long.toString(postId), CommentToMapConverter.ATTR_ID, Long.toString(commentId)));
    }

    public TopicCreatedEvent topicCreated(Object source, @NotNull Topic topic) {
        return new TopicCreatedEvent(source, modelMapper.map(topic,  Map.class));
    }

    public TopicUpdatedEvent topicUpdated(Object source, @NotNull Topic topic) {
        return new TopicUpdatedEvent(source, modelMapper.map(topic,  Map.class));
    }

    public TopicDeletedEvent topicDeleted(Object source, @NotNull Long topicId) {
        return new TopicDeletedEvent(source,
                Map.of(PostToMapConverter.ATTR_ID, Long.toString(topicId))
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

    private Map mapCommentCommon(@NotNull Long postId, @NotNull Comment comment) {
        Map map = modelMapper.map(comment, Map.class);
        map.put(PostToMapConverter.ATTR_ID, postId);
        map.put(CommentToMapConverter.ATTR_REF, WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
                .getCommentById(postId, comment.getId())).toString());
        return map;
    }
}
