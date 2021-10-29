package org.zabardast.common.events.publishers;

public interface EventPublisher<T> {
    void publishEvent(T event);
}
