package org.zabardast.resources.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.model.ResourceKey;

public class ResourceCreatedEvent extends BaseEvent<ResourceKey> {
    public ResourceCreatedEvent(Object source, @NotNull ResourceKey resourceId) {
        super(source, resourceId);
    }
}