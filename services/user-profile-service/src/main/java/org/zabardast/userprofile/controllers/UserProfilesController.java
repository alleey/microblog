
package org.zabardast.userprofile.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.Principal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.common.filtering.Filter;
import org.zabardast.userprofile.dto.UserProfileRequestRepresentation;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.dto.assemblers.UserProfileResponseRepresentationAssembler;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.services.UserProfileService;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/users")
@ExposesResourceFor(UserProfile.class)
@Validated
public class UserProfilesController {

	@Autowired
	UserProfileService userProfileService;

	@Autowired
	PagedResourcesAssembler<UserProfileResponseRepresentation> pagedAssembler;

	@Autowired
	UserProfileResponseRepresentationAssembler assembler;

	@GetMapping()
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getAll(final Pageable page) {
		PagedModel<?> entities = pagedAssembler.toModel(
			userProfileService.getAllUserProfiles(page),
			assembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("search")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> search(
			@NotBlank @RequestParam("q")  final String criteria,
			final Pageable page)
	{
		try
		{
			ObjectMapper mapper = new ObjectMapper();
			mapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
			Filter filter = mapper.readValue(criteria, Filter.class);

			PagedModel<?> entities = pagedAssembler.toModel(
				userProfileService.getAllFiltered(filter, page),
				assembler
			);
			return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
		}
		catch (JsonProcessingException e)
		{
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping(value = "{userProfileId}")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getUserProfileById(
			@NotBlank @PathVariable("userProfileId") String userProfileId)
	{
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(userProfileService.getUserProfile(userProfileId)));
	}

	@PutMapping(value = "{userProfileId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @userProfileOwnership.require(#userProfileId, authentication)")
	public ResponseEntity<?> updateUserProfile(
			@NotBlank @PathVariable String userProfileId,
			@NotNull @RequestBody UserProfileRequestRepresentation userProfile,
			@NotNull Authentication authentication)
	{
		EntityModel<?> entity = assembler.toModel(
			userProfileService.updateUserProfile(userProfileId, userProfile, false)
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{userProfileId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @userProfileOwnership.require(#userProfileId, authentication)")
	public ResponseEntity<?> deleteUserProfile(
			@NotBlank @PathVariable String userProfileId, @NotNull Authentication authentication)
	{
		userProfileService.deleteUserProfile(userProfileId);
		return ResponseEntity.noContent().build();
	}
}
