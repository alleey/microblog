package org.zabardast.common.events.publishers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.services.ServiceSecurityContextProvider;

public class LocalEventPublishser implements EventPublisher<BaseEvent> {
    @Autowired
    ApplicationEventPublisher publisher;

    @Autowired
    ServiceSecurityContextProvider serviceSecurityContextProvider;

    @Override
    public void publishEvent(BaseEvent event) {
        event.setPrincipal(serviceSecurityContextProvider.getPrincipalName());
        publisher.publishEvent(event);
    }
}
