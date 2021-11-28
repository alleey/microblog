package org.zabardast.stats.events;

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
import org.zabardast.stats.dto.converters.CounterToMapConverter;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.model.CounterKey;
import org.zabardast.stats.model.Event;

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
        modelMapper.addConverter(new CounterToMapConverter());
    }

    public CounterCreatedEvent counterCreated(Object source, @NotNull Counter counter) {
        return new CounterCreatedEvent(source, modelMapper.map(counter,  Map.class));
    }

    public CounterUpdatedEvent counterUpdated(Object source, @NotNull Counter counter) {
        return new CounterUpdatedEvent(source, modelMapper.map(counter,  Map.class));
    }

    public CounterDeletedEvent counterDeleted(Object source, @NotNull CounterKey counterKey) {
        return new CounterDeletedEvent(source,
            Map.of(CounterToMapConverter.ATTR_ID, counterKey.getCounter())
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
