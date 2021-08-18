package org.zabardast.stats.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.services.CounterService;

@Slf4j
@Component
public class CounterOwnership {
    @Autowired
    CounterService counterService;

    public boolean require(String counterId, Authentication authentication) {
        Counter counter = counterService.getCounter(counterId, authentication.getName());
        return counter.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
