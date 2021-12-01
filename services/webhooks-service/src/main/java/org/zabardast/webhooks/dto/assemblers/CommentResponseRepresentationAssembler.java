package org.zabardast.webhooks.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.webhooks.dto.CommentResponseRepresentation;

@Component
public class CommentResponseRepresentationAssembler implements
    RepresentationModelAssembler<CommentResponseRepresentation, EntityModel<CommentResponseRepresentation>> {
    @Override
    public EntityModel<CommentResponseRepresentation> toModel(CommentResponseRepresentation webhooksComment) {

        return EntityModel.of(
            webhooksComment,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostCommentsController.class)
                    .getCommentById(webhooksComment.getPostId(), webhooksComment.getId()))
                .withSelfRel()
        );
    }

}
