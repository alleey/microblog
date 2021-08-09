package org.zabardast.bookmarks.services;

import java.util.Arrays;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.bookmarks.config.ServiceConfig;
import org.zabardast.bookmarks.dto.BookmarkRepresentation;
import org.zabardast.bookmarks.events.BookmarkCreatedEvent;
import org.zabardast.bookmarks.events.BookmarkDeletedEvent;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.repository.BookmarkRepository;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.common.filtering.Operator;

@Service
public class BookmarkService 
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    BookmarkRepository bookmarkRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private ServiceConfig serviceConfig;

    @Transactional
    public Bookmark getBookmark(@NotNull String ownerId, @NotNull Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository
                .findByIdAndOwner(bookmarkId, ownerId)
                .orElseThrow(() -> new BookmarkNotFoundException(bookmarkId));
        return bookmark;
    }

    @Transactional
    public Bookmark getBookmark(@NotNull Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository
                .findById(bookmarkId)
                .orElseThrow(() -> new BookmarkNotFoundException(bookmarkId));
        return bookmark;
    }

    @Transactional
    public Page<Bookmark> getAllBookmarks(@NotNull String ownerId, @NotNull Pageable pageable) {
        return bookmarkRepository.findAllByOwner(ownerId, pageable);
    }

    @Transactional
    public Page<Bookmark> getAllFiltered(@NotNull String ownerId, @NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Bookmark> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Bookmark.class,
                Filter.builder().conditions(Arrays.asList(
                    Condition.builder().attribute("owner").operator(Operator.EQ).value(ownerId).build(),
                    criteria
                )).build(),
                pageable.getSort());
        TypedQuery<Bookmark> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Bookmark> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result;
    }

    @Transactional
    public Bookmark newBookmark(@NotNull String ownerId, @NotNull BookmarkRepresentation bookmarkRepresentation) {
        Bookmark bookmark = modelMapper.map(bookmarkRepresentation, Bookmark.class);
        bookmark.setCreatedOn(new Date());
        bookmark.setOwner(ownerId);

        Bookmark saved = bookmarkRepository.save(bookmark);
        eventPublisher.publishEvent(new BookmarkCreatedEvent(this, saved));
        return saved;
    }

    @Transactional
    public Bookmark updateBookmark(@NotNull Long bookmarkId, @NotNull BookmarkRepresentation bookmark) {
        return bookmarkRepository.findById(bookmarkId)
                .map(found -> {
                    found.setCaption(bookmark.getCaption());
                    found.setUrl(bookmark.getUrl());

                    Bookmark saved = bookmarkRepository.save(found);
                    eventPublisher.publishEvent(new BookmarkCreatedEvent(this, saved));
                    return saved;
                })
                .orElseThrow(() -> {
                    throw new BookmarkNotFoundException(bookmarkId);
                });
    }

    @Transactional
    public void deleteBookmark(@NotNull Long bookmarkId) {
        if(bookmarkRepository.existsById(bookmarkId)) {
            bookmarkRepository.deleteById(bookmarkId);
            eventPublisher.publishEvent(new BookmarkDeletedEvent(this, bookmarkId));
        }
    }
}
