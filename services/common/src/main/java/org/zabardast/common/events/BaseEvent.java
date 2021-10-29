package org.zabardast.common.events;

import org.springframework.context.ApplicationEvent;

public abstract class BaseEvent<T> extends ApplicationEvent {

    private final T data;
    private String principal;

    public BaseEvent(Object source, T data) {
        super(source);
        this.data = data;
        this.principal = null;
    }

    public BaseEvent(Object source, T data, String principal) {
        super(source);
        this.data = data;
        this.principal = principal;
    }

    public final T getData() {
        return data;
    }

    public final String getPrincipal() {
        return principal;
    }
    public final void setPrincipal(String principal) { this.principal = principal; }
}
