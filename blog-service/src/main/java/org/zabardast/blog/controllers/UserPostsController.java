
package org.zabardast.blog.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.assemblers.PostModelAssembler;
import org.zabardast.blog.services.PostService;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users/{userId}")
@Relation(collectionRelation = "posts")
public class UserPostsController {

	@Autowired
    PostService postService;

	@Autowired
	private PagedResourcesAssembler<Post> pagedAssembler;

	@Autowired
	PostModelAssembler assembler;

	@GetMapping(value = "posts")
	public ResponseEntity<PagedModel<EntityModel<Post>>> getOwnersPosts(
			@PathVariable("userId") String userId,
			@NotNull final Pageable page) {

		PagedModel<EntityModel<Post>> entities = pagedAssembler.toModel(
			postService.getOwnerPosts(userId, page),
			assembler
		);

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}
}
