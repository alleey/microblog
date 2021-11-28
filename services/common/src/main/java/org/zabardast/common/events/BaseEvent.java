package org.zabardast.common.events;

import com.sun.istack.NotNull;
import java.util.HashMap;
import java.util.Map;
import org.springframework.context.ApplicationEvent;

public abstract class BaseEvent extends ApplicationEvent {

    private final Map<String, Object> data;
    private String principal;

    public BaseEvent(Object source) {
        super(source);
        this.data = new HashMap<>();
    }
    public BaseEvent(Object source, @NotNull Map<String, Object> data) {
        super(source);
        this.data = data;
    }

    public final Map<String, Object> attributes() {
        return data;
    }
    public final String getPrincipal() {
        return principal;
    }
    public final void setPrincipal(String principal) { this.principal = principal; }
}
