package org.zabardast.resources.events;

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
import org.zabardast.resources.dto.converters.ResourceToMapConverter;
import org.zabardast.resources.model.Event;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.model.ResourceKey;

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
        modelMapper.addConverter(new ResourceToMapConverter());
    }

    public ResourceCreatedEvent resourceCreated(Object source, @NotNull Resource bookmark) {
        return new ResourceCreatedEvent(source, modelMapper.map(bookmark,  Map.class));
    }

    public ResourceUpdatedEvent resourceUpdated(Object source, @NotNull Resource bookmark) {
        return new ResourceUpdatedEvent(source, modelMapper.map(bookmark,  Map.class));
    }

    public ResourceDeletedEvent resourceDeleted(Object source, @NotNull ResourceKey resourceKey) {
        return new ResourceDeletedEvent(source,
            Map.of(ResourceToMapConverter.ATTR_RESOURCE, resourceKey.getResource(),
                    ResourceToMapConverter.ATTR_KEY, resourceKey.getKey())
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
