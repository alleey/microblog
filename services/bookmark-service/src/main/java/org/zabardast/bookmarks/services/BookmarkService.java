package org.zabardast.bookmarks.services;

import java.util.Arrays;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.bookmarks.dto.BookmarkRequestRepresentation;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.events.EventFactory;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.repository.BookmarkRepository;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.common.filtering.Operator;

@Service
public class BookmarkService 
{
    @Autowired
    @Qualifier("transactionOutboxPublisher")
    EventPublisher eventPublisher;

    @Autowired
    EventFactory eventFactory;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    BookmarkRepository bookmarkRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public BookmarkResponseRepresentation getBookmark(@NotNull String ownerId, @NotNull Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository
                .findByIdAndOwner(bookmarkId, ownerId)
                .orElseThrow(() -> new BookmarkNotFoundException(bookmarkId));
        return modelMapper.map(bookmark, BookmarkResponseRepresentation.class);
    }

    @Transactional
    public BookmarkResponseRepresentation getBookmark(@NotNull Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository
                .findById(bookmarkId)
                .orElseThrow(() -> new BookmarkNotFoundException(bookmarkId));
        return modelMapper.map(bookmark, BookmarkResponseRepresentation.class);
    }

    @Transactional
    public Page<BookmarkResponseRepresentation> getAllBookmarks(@NotNull String ownerId, @NotNull Pageable pageable) {
        return bookmarkRepository
                .findAllByOwner(ownerId, pageable)
                .map(i -> modelMapper.map(i, BookmarkResponseRepresentation.class));
    }

    @Transactional
    public Page<BookmarkResponseRepresentation> findAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<Bookmark> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Bookmark.class,
                criteria,
                pageable.getSort());
        TypedQuery<Bookmark> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Bookmark> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, BookmarkResponseRepresentation.class));
    }

    @Transactional
    public Page<BookmarkResponseRepresentation> findAllFiltered(@NotNull String ownerId, @NotNull Filter criteria, @NotNull Pageable pageable) {

        return findAllFiltered(Filter.builder()
                .conditions(Arrays.asList(
                    Condition.builder()
                            .attribute("owner")
                            .operator(Operator.EQ)
                            .value(ownerId)
                            .build(),
                    criteria))
                .build(), pageable);
    }

    @Transactional
    public BookmarkResponseRepresentation newBookmark(@NotNull String ownerId, @NotNull BookmarkRequestRepresentation bookmarkRequestRepresentation) {
        Bookmark bookmark = modelMapper.map(bookmarkRequestRepresentation, Bookmark.class);
        bookmark.setCreatedOn(new Date());
        bookmark.setOwner(ownerId);

        Bookmark saved = bookmarkRepository.save(bookmark);
        eventPublisher.publishEvent(eventFactory.bookmarkCreated(this, saved));
        return modelMapper.map(saved, BookmarkResponseRepresentation.class);
    }

    @Transactional
    public BookmarkResponseRepresentation updateBookmark(@NotNull Long bookmarkId, @NotNull BookmarkRequestRepresentation bookmark) {
        return bookmarkRepository.findById(bookmarkId)
                .map(found -> {
                    found.setCaption(bookmark.getCaption());
                    found.setUrl(bookmark.getUrl());

                    Bookmark saved = bookmarkRepository.save(found);
                    eventPublisher.publishEvent(eventFactory.bookmarkUpdated(this, saved));
                    return modelMapper.map(saved, BookmarkResponseRepresentation.class);
                })
                .orElseThrow(() -> {
                    throw new BookmarkNotFoundException(bookmarkId);
                });
    }

    @Transactional
    public void deleteBookmark(@NotNull Long bookmarkId) {
        if(bookmarkRepository.existsById(bookmarkId)) {
            bookmarkRepository.deleteById(bookmarkId);
            eventPublisher.publishEvent(eventFactory.bookmarkDeleted(this, bookmarkId));
        }
    }
}
