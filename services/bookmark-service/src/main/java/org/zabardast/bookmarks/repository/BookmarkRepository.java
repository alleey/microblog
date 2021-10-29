package org.zabardast.bookmarks.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.bookmarks.model.Bookmark;


@Repository
public interface BookmarkRepository extends PagingAndSortingRepository<Bookmark, Long> {
    public Page<Bookmark> findAllByOwner(String ownerId, Pageable page);
    public Optional<Bookmark> findByIdAndOwner(Long bookmarkId, String ownerId);
}
