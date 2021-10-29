package org.zabardast.blog.repository;

import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends PagingAndSortingRepository<Comment, Long> {
    public Page<Comment> findAllByPost(Post post, Pageable page);
    public Optional<Comment> findByPostAndId(Post post, Long commentId);
    public void deleteByPostAndId(Post post, Long commentId);
}
