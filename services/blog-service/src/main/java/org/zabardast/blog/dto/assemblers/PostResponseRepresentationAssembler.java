package org.zabardast.blog.dto.assemblers;

import org.springframework.data.domain.Pageable;
import org.zabardast.blog.controllers.PostsController;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.model.Post;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class PostResponseRepresentationAssembler implements
        RepresentationModelAssembler<PostResponseRepresentation, EntityModel<PostResponseRepresentation>>
{
    @Override
    public EntityModel<PostResponseRepresentation> toModel(PostResponseRepresentation blogPost) {
        return EntityModel.of(
                blogPost,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostsController.class)
                .getPostById(blogPost.getId()))
                .withSelfRel(),
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostsController.class)
                .getAll(Pageable.unpaged()))
                .withRel("/")
        );
    }
}
