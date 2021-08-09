package org.zabardast.blog.model.assemblers;

import org.springframework.data.domain.Pageable;
import org.zabardast.blog.controllers.PostsController;
import org.zabardast.blog.model.Post;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class PostModelAssembler implements RepresentationModelAssembler<Post, EntityModel<Post>> {
    
    @Override
    public EntityModel<Post> toModel(Post blogPost) {
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
