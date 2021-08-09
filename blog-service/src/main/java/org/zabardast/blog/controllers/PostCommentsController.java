
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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.blog.dto.CommentRepresentation;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.assemblers.CommentModelAssembler;
import org.zabardast.blog.services.CommentService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/posts/{postId}/comments")
@Relation(collectionRelation = "comments")
public class PostCommentsController {

	@Autowired
	CommentService commentService;

	@Autowired
	private PagedResourcesAssembler<Comment> pagedAssembler;

	@Autowired
    CommentModelAssembler assembler;

	@GetMapping()
	public ResponseEntity<PagedModel<EntityModel<Comment>>> getAll (@PathVariable("postId") Long postId, @NotNull final Pageable page) {

		PagedModel<EntityModel<Comment>> entities = pagedAssembler.toModel(
			commentService.getPostComments(postId, page),
			assembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping(value = "{commentId}")
	public ResponseEntity<EntityModel<Comment>> getCommentById(@PathVariable Long postId,
															   @PathVariable Long commentId) {
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(commentService.getPostComment(postId, commentId)));
	}

	@PostMapping()
	public ResponseEntity<?> newComment(@PathVariable("postId") Long postId,
										@RequestBody CommentRepresentation blogComment,
										@NotNull Authentication authentication) {
		EntityModel<Comment> entity = assembler.toModel(
			commentService.newComment(postId, authentication.getName(), blogComment)
		);
		return ResponseEntity.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entity);
	}

	@PutMapping(value = "{commentId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @commentOwnership.require(#postId, #commentId, authentication)")
	public ResponseEntity<?> updateComment(@PathVariable("postId") Long postId,
										   @PathVariable Long commentId,
										   @RequestBody CommentRepresentation blogComment) {
		EntityModel<Comment> entity = assembler.toModel(
			commentService.updateComment(postId, commentId, blogComment)
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{commentId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @commentOwnership.require(#postId, #commentId, authentication)")
	public ResponseEntity<?> deleteComment(@PathVariable("postId") Long postId, @PathVariable Long commentId) {
		commentService.deleteComment(postId, commentId);
		return ResponseEntity.noContent().build();
	}
}
