package org.zabardast.userprofile.events;

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
import org.zabardast.userprofile.dto.converters.UserProfileToMapConverter;
import org.zabardast.userprofile.model.Event;
import org.zabardast.userprofile.model.UserProfile;

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
        modelMapper.addConverter(new UserProfileToMapConverter());
    }

    public UserProfileCreatedEvent userProfileCreated(Object source, @NotNull UserProfile userprofile) {
        return new UserProfileCreatedEvent(source, modelMapper.map(userprofile,  Map.class));
    }

    public UserProfileUpdatedEvent userProfileUpdated(Object source, @NotNull UserProfile userprofile) {
        return new UserProfileUpdatedEvent(source, modelMapper.map(userprofile,  Map.class));
    }

    public UserProfileDeletedEvent userProfileDeleted(Object source, @NotNull String userprofileId) {
        return new UserProfileDeletedEvent(source,
            Map.of(UserProfileToMapConverter.ATTR_ID, userprofileId)
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
