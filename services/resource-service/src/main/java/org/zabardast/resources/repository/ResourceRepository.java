package org.zabardast.resources.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.model.ResourceKey;

@Repository
public interface ResourceRepository extends PagingAndSortingRepository<Resource, ResourceKey> {
    public Page<Resource> findByOwner(String ownerId, Pageable page);
    public Page<Resource> findByResource(String resource, Pageable page);
    public Page<Resource> findByResourceAndOwner(String resource, String ownerId, Pageable page);
}
