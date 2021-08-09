package org.zabardast.bookmarks.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.zabardast.common.events.EventPublisher;

public class LocalEventPublishser implements EventPublisher {
    @Autowired
    ApplicationEventPublisher publisher;

    @Override
    public void publishEvent(Object event) {
        publisher.publishEvent(event);
    }
}
