
package org.zabardast.resources.controllers;

import java.io.IOException;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.ExposesResourceFor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.zabardast.resources.dto.ResourceRequestRepresentation;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.dto.assemblers.ResourceResponseRepresentationAssembler;
import org.zabardast.resources.model.Resource;
import org.zabardast.resources.services.ResourceManagerService;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/resources")
@ExposesResourceFor(Resource.class)
@Validated
public class ResourceController {

	public static final String VALID_NAME_PATTERN = ResourceRequestRepresentation.VALID_NAME_PATTERN;

	@Autowired
	ResourceManagerService manager;

	@Autowired
	PagedResourcesAssembler<ResourceResponseRepresentation> pagedAssembler;

	@Autowired
	ResourceResponseRepresentationAssembler assembler;

	@GetMapping(value = "{resource}")
	public ResponseEntity<?> getResources(
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("resource") String resource,
			final Pageable page)
	{

		PagedModel<?> entities = pagedAssembler.toModel(
			manager.findByResource(resource, page),
			assembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping(value = "{resource}/{key}")
	public ResponseEntity<?> getResource(
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("resource") String resource,
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("key") String key) {

		ResourceResponseRepresentation response = manager.getResource(resource, key, false);
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(response));
	}

	@GetMapping(value = "{resource}/{key}/download")
	public ResponseEntity<?> downloadResource(
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("resource") String resource,
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("key") String key)
	{
		ResourceResponseRepresentation response = manager.getResource(resource, key, true);
		return ResponseEntity
				.ok()
				.contentType(MediaType.parseMediaType(response.getContentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + response.getKey() + "\"")
				.body(response.getContents());
	}

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> newResource(
			@Valid @RequestPart("resource") ResourceRequestRepresentation request,
			@NotNull @RequestPart("file") MultipartFile file,
			Authentication authentication) throws IOException
	{
		String ownerId = authentication == null ? Resource.AnonymousOwner :authentication.getName(); // only for testing
		EntityModel<?> entity = assembler.toModel(
			manager.newResource(
					ownerId,
					request,
					file.getResource())
		);
		return ResponseEntity.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entity);
	}

	@PutMapping(value = "{resource}/{key}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @resourceOwnership.require(#resource, #key, authentication)")
	public ResponseEntity<?> updateResource(
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("resource") String resource,
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("key") String key,
			@Valid @RequestPart("resource") ResourceRequestRepresentation request,
			@NotNull @RequestPart("file") MultipartFile file,
			Authentication authentication) throws IOException
	{
		String ownerId = authentication == null ? Resource.AnonymousOwner :authentication.getName(); // only for testing
		request.setResource(resource);
		request.setKey(key);
		EntityModel<?> entity = assembler.toModel(
			manager.updateResource(
					ownerId,
					request,
					file.getResource())
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{resource}/{key}")
	//@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE') or @resourceOwnership.require(#resource, #key, authentication)")
	public ResponseEntity<?> deleteResource(
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("resource") String resource,
			@NotBlank @Pattern(regexp = VALID_NAME_PATTERN) @PathVariable("key") String key)
	{
		manager.deleteResource(key, resource);
		return ResponseEntity.noContent().build();
	}
}
