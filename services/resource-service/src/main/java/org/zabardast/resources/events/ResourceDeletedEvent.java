package org.zabardast.resources.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.resources.model.ResourceKey;

public class ResourceDeletedEvent extends BaseEvent<ResourceKey> {
    public ResourceDeletedEvent(Object source, @NotNull ResourceKey resourceId) {
        super(source, resourceId);
    }
}