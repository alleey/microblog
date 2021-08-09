package org.zabardast.userprofile.repository;

import java.util.Collection;
import java.util.Date;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.zabardast.userprofile.model.UserProfile;


@Repository
public interface UserProfileRepository extends PagingAndSortingRepository<UserProfile, String> {
    @Modifying
    @Query("update UserProfile u set u.syncedOn = ?1")
    void setSyncOnAll(Date timestamp);

    Collection<UserProfile> findBySyncedOnIsNull();
}
