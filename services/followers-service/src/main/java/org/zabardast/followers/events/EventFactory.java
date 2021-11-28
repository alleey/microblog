package org.zabardast.followers.events;

import java.util.Date;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.stereotype.Component;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.services.ServiceSecurityContextProvider;
import org.zabardast.common.utils.JsonUtils;
import org.zabardast.followers.dto.converters.FollowingToMapConverter;
import org.zabardast.followers.model.Event;
import org.zabardast.followers.model.Following;
import org.zabardast.followers.model.FollowingKey;

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
        modelMapper.addConverter(new FollowingToMapConverter());
    }

    public FollowingCreatedEvent followingCreated(Object source, @NotNull Following following) {
        return new FollowingCreatedEvent(source, modelMapper.map(following,  Map.class));
    }

    public FollowingDeletedEvent followingDeleted(Object source, @NotNull FollowingKey key) {
        return new FollowingDeletedEvent(source,
            Map.of(FollowingToMapConverter.ATTR_ID, key.getUser(),
                    FollowingToMapConverter.ATTR_FOLLOWER, key.getFollower())
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
