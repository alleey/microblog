package org.zabardast.blog.model.assemblers;

import org.zabardast.blog.controllers.PostCommentsController;
import org.zabardast.blog.model.Comment;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class CommentModelAssembler implements RepresentationModelAssembler<Comment, EntityModel<Comment>> {
    
    @Override
    public EntityModel<Comment> toModel(Comment blogComment) {
        return EntityModel.of(
                blogComment,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
                .getCommentById(blogComment.getPost().getId(), blogComment.getId()))
                .withSelfRel()
//            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
//                .getOwnersComments()))
//                .withRel("licenses")
        );
    }

}
