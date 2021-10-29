package org.zabardast.blog.dto.assemblers;

import org.zabardast.blog.controllers.PostCommentsController;
import org.zabardast.blog.dto.CommentResponseRepresentation;
import org.zabardast.blog.model.Comment;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class CommentResponseRepresentationAssembler implements
        RepresentationModelAssembler<CommentResponseRepresentation, EntityModel<CommentResponseRepresentation>>
{
    @Override
    public EntityModel<CommentResponseRepresentation> toModel(CommentResponseRepresentation blogComment) {
        return EntityModel.of(
                blogComment,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
                .getCommentById(blogComment.getPostId(), blogComment.getId()))
                .withSelfRel()
        );
    }

}
