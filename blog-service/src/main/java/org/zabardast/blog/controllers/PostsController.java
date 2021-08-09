
package org.zabardast.blog.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.server.core.Relation;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zabardast.blog.dto.PostRepresentation;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.assemblers.PostModelAssembler;
import org.zabardast.blog.services.PostService;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.common.filtering.Filter;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/posts")
@Relation(collectionRelation = "posts")
public class PostsController {

	@Autowired PostService postService;
	@Autowired PagedResourcesAssembler<Post> pagedAssembler;
	@Autowired PostModelAssembler assembler;

	@GetMapping()
	public ResponseEntity<PagedModel<EntityModel<Post>>> getAll (@NotNull final Pageable page) {

		PagedModel<EntityModel<Post>> entities = pagedAssembler.toModel(
			postService.getAllPosts(page),
			assembler
		);

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("search")
	public ResponseEntity<PagedModel<EntityModel<Post>>> getAllMatching(@NotNull @RequestParam("q")  final String criteria,
																		 final Pageable page)
	{
		try
		{
			ObjectMapper mapper = new ObjectMapper();
			mapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
			Filter filter = mapper.readValue(criteria, Filter.class);

			PagedModel<EntityModel<Post>> entities = pagedAssembler.toModel(
					postService.getAllFiltered(filter, page),
					assembler
			);
			return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
		}
		catch (JsonProcessingException e)
		{
			log.error(e.toString());
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping(value = "{postId}")
	public ResponseEntity<EntityModel<Post>> getPostById(@PathVariable("postId") long postId) {
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(postService.getPost(postId)));
	}

	@PostMapping()
	public ResponseEntity<?> newPost(@RequestBody PostRepresentation blogPost,
									 @NotNull Authentication authentication) {
		EntityModel<Post> entity = assembler.toModel(
			postService.newPost(authentication.getName(), blogPost)
		);
		return ResponseEntity.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entity);
	}

	@PutMapping(value = "{postId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> updatePost(@PathVariable long postId, @RequestBody PostRepresentation blogPost) {
		EntityModel<Post> entity = assembler.toModel(
			postService.updatePost(postId, blogPost)
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{postId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @postOwnership.require(#postId, authentication)")
	public ResponseEntity<?> deletePost(@PathVariable long postId) {
		postService.deletePost(postId);
		return ResponseEntity.noContent().build();
	}
}
