package org.zabardast.bookmarks.model.assemblers;

import org.springframework.data.domain.Pageable;
import org.zabardast.bookmarks.controllers.BookmarksController;
import org.zabardast.bookmarks.model.Bookmark;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class BookmarkModelAssembler implements RepresentationModelAssembler<Bookmark, EntityModel<Bookmark>> {
    @Override
    public EntityModel<Bookmark> toModel(Bookmark bookmark) {
        return EntityModel.of(
            bookmark,
            WebMvcLinkBuilder.linkTo(BookmarksController.class).slash(bookmark.getId()).withSelfRel()
        );
    }

}
