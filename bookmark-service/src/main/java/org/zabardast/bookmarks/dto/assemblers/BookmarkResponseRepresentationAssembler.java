package org.zabardast.bookmarks.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.bookmarks.controllers.BookmarksController;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;

@Component
public class BookmarkResponseRepresentationAssembler implements
        RepresentationModelAssembler<BookmarkResponseRepresentation, EntityModel<BookmarkResponseRepresentation>> {
    @Override
    public EntityModel<BookmarkResponseRepresentation> toModel(BookmarkResponseRepresentation bookmark) {
        return EntityModel.of(
            bookmark,
            WebMvcLinkBuilder.linkTo(BookmarksController.class).slash(bookmark.getId()).withSelfRel()
        );
    }

}
