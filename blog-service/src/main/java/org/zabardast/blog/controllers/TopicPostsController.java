
package org.zabardast.blog.controllers;

import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.assemblers.PostModelAssembler;
import org.zabardast.blog.services.PostService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/topics/{topicId}/posts")
@Relation(collectionRelation = "posts")
public class TopicPostsController {

	@Autowired PostService postService;
	@Autowired PagedResourcesAssembler<Post> pagedAssembler;
	@Autowired PostModelAssembler assembler;

	@GetMapping()
	public ResponseEntity<PagedModel<EntityModel<Post>>> getAll (
			@PathVariable("topicId") Long topicId,
			@NotNull final Pageable page) {

		PagedModel<EntityModel<Post>> entities = pagedAssembler.toModel(
			postService.getTopicPosts(topicId, page),
			assembler
		);

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}
}
