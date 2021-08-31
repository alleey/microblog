
package org.zabardast.bookmarks.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.ExposesResourceFor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.bookmarks.dto.BookmarkRequestRepresentation;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.dto.assemblers.BookmarkResponseRepresentationAssembler;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.services.BookmarkService;
import org.zabardast.common.filtering.Filter;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/bookmarks")
@ExposesResourceFor(Bookmark.class)
public class BookmarksController {

	@Autowired
	BookmarkService bookmarkService;

	@Autowired
	PagedResourcesAssembler<BookmarkResponseRepresentation> pagedAssembler;

	@Autowired
	BookmarkResponseRepresentationAssembler assembler;

	@GetMapping()
	public ResponseEntity<?> getAll(final Pageable page, @NotNull Authentication authentication) {
		PagedModel<?> entities = pagedAssembler.toModel(
			bookmarkService.getAllBookmarks(authentication.getName(), page),
			assembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("search")
	public ResponseEntity<?> search(@NotNull @RequestParam("q")  final String criteria,
																			final Pageable page,
																			@NotNull Authentication authentication)
	{
		try
		{
			ObjectMapper mapper = new ObjectMapper();
			mapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
			Filter filter = mapper.readValue(criteria, Filter.class);

			PagedModel<?> entities = pagedAssembler.toModel(
				bookmarkService.getAllFiltered(authentication.getName(), filter, page),
				assembler
			);
			return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
		}
		catch (JsonProcessingException e)
		{
			log.error(e.toString());
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping(value = "{bookmarkId}")
	public ResponseEntity<?> getBookmarkById(@PathVariable("bookmarkId") Long bookmarkId,
																 @NotNull Authentication authentication) {
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(bookmarkService.getBookmark(authentication.getName(), bookmarkId)));
	}

	@PostMapping()
	public ResponseEntity<?> newBookmark(@NotNull @RequestBody BookmarkRequestRepresentation bookmark, @NotNull Authentication authentication) {
		EntityModel<?> entity = assembler.toModel(
			bookmarkService.newBookmark(authentication.getName(), bookmark)
		);
		return ResponseEntity.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entity);
	}

	@PutMapping(value = "{bookmarkId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @bookmarkOwnership.require(#bookmarkId, authentication)")
	public ResponseEntity<?> updateBookmark(@PathVariable Long bookmarkId,
											@NotNull @RequestBody BookmarkRequestRepresentation bookmark,
											@NotNull Authentication authentication)
	{
		EntityModel<?> entity = assembler.toModel(
			bookmarkService.updateBookmark(bookmarkId, bookmark)
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{bookmarkId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @bookmarkOwnership.require(#bookmarkId, authentication)")
	public ResponseEntity<?> deleteBookmark(@PathVariable Long bookmarkId) {
		bookmarkService.deleteBookmark(bookmarkId);
		return ResponseEntity.noContent().build();
	}
}
