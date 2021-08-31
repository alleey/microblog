package org.zabardast.followers.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.followers.model.Following;
import org.zabardast.followers.model.FollowingKey;

@Repository
public interface FollowingRepository extends PagingAndSortingRepository<Following, FollowingKey> {
    public Page<Following> findAllByUser(String followedId, Pageable page);
    public Page<Following> findAllByFollowedBy(String followingId, Pageable page);
}
