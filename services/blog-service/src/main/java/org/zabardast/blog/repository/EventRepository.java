package org.zabardast.blog.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.blog.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    Optional<Event> findTopByOrderBySequenceAsc();
}
