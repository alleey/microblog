
package org.zabardast.followers.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.common.filtering.Filter;
import org.zabardast.followers.dto.FollowRequestRepresentation;
import org.zabardast.followers.dto.FollowResponseRepresentation;
import org.zabardast.followers.dto.assemblers.FollowRepresentationAssembler;
import org.zabardast.followers.model.Following;
import org.zabardast.followers.services.FollowingService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users/{userId}/following")
@ExposesResourceFor(Following.class)
public class FollowingController {

	@Autowired
	FollowingService followingService;

	@Autowired
	PagedResourcesAssembler<FollowResponseRepresentation> followResponseRepresentationPagedResourcesAssembler;

	@Autowired
	FollowRepresentationAssembler followRepresentationAssembler;

	@GetMapping(value = "{followedId}")
	public ResponseEntity<?> getOne(@PathVariable String userId, @PathVariable String followedId) {
		FollowResponseRepresentation response = followingService.listOne(followedId, userId);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(response);
	}

	@GetMapping("")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getAlLFollowing(@PathVariable String userId, final Pageable page)
	{
		PagedModel<?> entities = followResponseRepresentationPagedResourcesAssembler.toModel(
			followingService.listFollowing(userId, page),
			followRepresentationAssembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("search")
	public ResponseEntity<?> findFollowing(@PathVariable String userId,
										   @NotNull @RequestParam("q")  final String criteria,
										   final Pageable page)
	{
		try
		{
			ObjectMapper mapper = new ObjectMapper();
			mapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
			Filter filter = mapper.readValue(criteria, Filter.class);

			PagedModel<?> entities = followResponseRepresentationPagedResourcesAssembler.toModel(
					followingService.findFollowing(userId, filter, page),
					followRepresentationAssembler
			);
			return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
		}
		catch (JsonProcessingException e)
		{
			log.error(e.toString());
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping(value = "")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @followingOwnership.require(#userId, authentication)")
	public ResponseEntity<?> follow(@PathVariable String userId,
									@RequestBody FollowRequestRepresentation followRequest)
	{
		FollowResponseRepresentation following = followingService
				.follow(userId, followRequest);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{followedId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @followingOwnership.require(#userId, authentication)")
	public ResponseEntity<?> unfollow(@PathVariable String userId, @PathVariable String followedId) {
		followingService.unfollow(userId, followedId);
		return ResponseEntity.noContent().build();
	}
}
