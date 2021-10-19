package org.zabardast.stats.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.stats.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    Optional<Event> findTopByOrderByIdAsc();
}
