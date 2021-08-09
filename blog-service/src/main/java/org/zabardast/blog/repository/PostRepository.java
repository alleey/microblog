package org.zabardast.blog.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {
    public Optional<Post> findBySlug(String slug);
    public Page<Post> findAll(Pageable page);
    public Page<Post> findAllByTopics(Topic post, Pageable page);
    public Page<Post> findByOwner(String ownerId, Pageable page);
}
