package org.zabardast.blog.repository;

import org.zabardast.blog.model.Topic;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends PagingAndSortingRepository<Topic, Long> {
    public Optional<Topic> findByCaption(String caption);
    public Page<Topic> findAll(Pageable page);
}
