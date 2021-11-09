
package org.zabardast.blog.controllers;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.blog.services.PostTopicService;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/posts/{postId}/topics")
@Relation(collectionRelation = "topics")
public class PostTopicsController {

	@Autowired
	PostTopicService postTopicService;

	@PostMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> assignPostTopic(@PathVariable("postId") Long postId, @RequestBody Long topicId) {
		postTopicService.assignTopic(postId, topicId);
		return ResponseEntity.ok().build();
	}

	@PutMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> setPostTopics(@PathVariable("postId") Long postId, @RequestBody List<Long> topicIds) {
		postTopicService.resetTopics(postId, topicIds);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{topicId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> unassignPostTopic(@PathVariable("postId") Long postId, @PathVariable Long topicId) {
		postTopicService.unassignTopic(postId, topicId);
		return ResponseEntity.noContent().build();
	}
}
