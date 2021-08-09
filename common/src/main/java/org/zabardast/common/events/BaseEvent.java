package org.zabardast.common.events;

import org.springframework.context.ApplicationEvent;

public abstract class BaseEvent<T> extends ApplicationEvent {

    protected T data;

    public BaseEvent(Object source, T data) {
        super(source);
        this.data = data;
    }

    public BaseEvent(T data){
        super(data);
    }

    public T getData() {
        return data;
    }
}