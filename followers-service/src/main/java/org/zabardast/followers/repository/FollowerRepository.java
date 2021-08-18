package org.zabardast.followers.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.followers.model.Follower;
import org.zabardast.followers.model.FollowerKey;

@Repository
public interface FollowerRepository extends PagingAndSortingRepository<Follower, FollowerKey> {
    public Page<Follower> findAllById(String id, Pageable page);
    public Page<Follower> findAllByFollower(String follower, Pageable page);
}
