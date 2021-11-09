
package org.zabardast.blog.controllers;

import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.dto.assemblers.PostResponseRepresentationAssembler;
import org.zabardast.blog.services.PostService;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/topics/{topicId}/posts")
@Relation(collectionRelation = "posts")
public class TopicPostsController {

	@Autowired
	PostService postService;

	@Autowired
	PagedResourcesAssembler<PostResponseRepresentation> pagedAssembler;

	@Autowired
	PostResponseRepresentationAssembler assembler;

	@GetMapping()
	public ResponseEntity<?> getAll (
			@PathVariable("topicId") Long topicId,
			@NotNull final Pageable page) {

		PagedModel<?> entities = pagedAssembler.toModel(
			postService.getTopicPosts(topicId, page),
			assembler
		);

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}
}
