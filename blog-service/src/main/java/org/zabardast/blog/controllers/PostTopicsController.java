
package org.zabardast.blog.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.zabardast.blog.model.assemblers.TopicModelAssembler;
import org.zabardast.blog.services.PostService;
import org.zabardast.blog.services.TopicService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/posts/{postId}/topics")
@Relation(collectionRelation = "topics")
public class PostTopicsController {

	@Autowired PostService postService;
	@Autowired TopicService topicService;
	@Autowired TopicModelAssembler assembler;

	@PostMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> assignPostTopic(@PathVariable("postId") Long postId, @RequestBody Long topicId) {
		postService.assignTopic(postId, topicService.findOne(topicId));
		return ResponseEntity.ok().build();
	}

	@PutMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> setPostTopics(@PathVariable("postId") Long postId, @RequestBody List<Long> topicIds) {
		postService.resetTopics(
			postId,
			topicIds.stream()
				.map(i -> topicService.findOne(i))
				.collect(Collectors.toList())
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{topicId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> unassignPostTopic(@PathVariable("postId") Long postId, @PathVariable Long topicId) {
		postService.unassignTopic(postId, topicService.findOne(topicId));
		return ResponseEntity.noContent().build();
	}
}
