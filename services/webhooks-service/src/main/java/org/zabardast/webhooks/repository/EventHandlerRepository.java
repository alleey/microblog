package org.zabardast.webhooks.repository;

import java.util.Optional;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.webhooks.model.EventHandler;

@Repository
public interface EventHandlerRepository extends PagingAndSortingRepository<EventHandler, Long> {
    public Optional<EventHandler> findByEventName(String eventName);
}
