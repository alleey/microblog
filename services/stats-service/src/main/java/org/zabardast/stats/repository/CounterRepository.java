package org.zabardast.stats.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.model.CounterKey;
import org.zabardast.stats.model.CounterStatistics;

@Repository
public interface CounterRepository extends PagingAndSortingRepository<Counter, CounterKey> {

    @Query("SELECT new org.zabardast.stats.model.CounterStatistics(" +
            "count(value) as count," +
            "min(value) as min," +
            "max(value) as max," +
            "sum(value) as sum," +
            "avg(value) as avg" +
           ") " +
           "FROM Counter " +
           "WHERE counter=:counterId")
    public Optional<CounterStatistics> getCounterStatistics(@Param("counterId") String counterId);

    public Counter findByCounterAndOwner(String counterId, String ownerId);
    public Page<Counter> findByOwner(String ownerId, Pageable page);
    public Page<Counter> findByCounter(String counterId, Pageable page);
}
