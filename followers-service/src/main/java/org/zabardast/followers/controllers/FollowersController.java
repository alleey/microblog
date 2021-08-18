
package org.zabardast.followers.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.ExposesResourceFor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.followers.dto.FollowerResponseRepresentation;
import org.zabardast.followers.dto.FollowingResponseRepresentation;
import org.zabardast.followers.dto.assemblers.FollowingRepresentationAssembler;
import org.zabardast.followers.model.Follower;
import org.zabardast.followers.dto.assemblers.FollowerRepresentationAssembler;
import org.zabardast.followers.services.FollowerService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users/{userId}")
@ExposesResourceFor(Follower.class)
public class FollowersController {

	@Autowired
	FollowerService followerService;

	@Autowired
	PagedResourcesAssembler<FollowerResponseRepresentation> pagedFollowerAssembler;

	@Autowired
	PagedResourcesAssembler<FollowingResponseRepresentation> pagedFollowingAssembler;

	@Autowired
	FollowerRepresentationAssembler followerRepresentationAssembler;

	@Autowired
	FollowingRepresentationAssembler followingRepresentationAssembler;

	@GetMapping("followers")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<PagedModel<EntityModel<FollowerResponseRepresentation>>>
		getAlLFollowers(@PathVariable String userId, final Pageable page)
	{
		PagedModel<EntityModel<FollowerResponseRepresentation>> entities = pagedFollowerAssembler.toModel(
			followerService.getAllFollowers(userId, page).map(f -> new FollowerResponseRepresentation(f)),
			followerRepresentationAssembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("following")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<PagedModel<EntityModel<FollowingResponseRepresentation>>>
		getAlLFollowing(@PathVariable String userId, final Pageable page)
	{
		PagedModel<EntityModel<FollowingResponseRepresentation>> entities = pagedFollowingAssembler.toModel(
			followerService.getAllFollowing(userId, page).map(f -> new FollowingResponseRepresentation(f)),
			followingRepresentationAssembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@PutMapping(value = "following")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @followerOwnership.require(#userId, authentication)")
	public ResponseEntity<?> follow(@PathVariable String userId, @RequestBody String userToFollow) {
		Follower follower = followerService.addFollower(userToFollow, userId);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "following/{userToFollow}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @followerOwnership.require(#userId, authentication)")
	public ResponseEntity<?> unfollow(@PathVariable String userId, @PathVariable String userToFollow) {
		followerService.removeFollower(userToFollow, userId);
		return ResponseEntity.noContent().build();
	}
}
