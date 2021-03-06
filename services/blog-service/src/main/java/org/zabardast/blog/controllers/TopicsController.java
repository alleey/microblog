
package org.zabardast.blog.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.validation.constraints.NotBlank;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.dto.assemblers.TopicResponseRepresentationAssembler;
import org.zabardast.blog.services.TopicService;
import org.zabardast.common.filtering.Filter;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/topics")
@Relation(collectionRelation = "topics")
@Validated
public class TopicsController {

	@Autowired
    TopicService topicService;

	@Autowired
	private PagedResourcesAssembler<TopicResponseRepresentation> pagedAssembler;

	@Autowired
	TopicResponseRepresentationAssembler assembler;

	@GetMapping()
	public ResponseEntity<?> getAll (@NotNull final Pageable page) {
		PagedModel<?> entities = pagedAssembler.toModel(
			topicService.getAllTopics(page),
			assembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("search")
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
				topicService.getAllFiltered(filter, page),
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

	@GetMapping(value = "{topicId}")
	public ResponseEntity<?> getTopicById(@PathVariable("topicId") Long topicId) {
		return ResponseEntity
				.ok()
				.contentType(MediaTypes.HAL_JSON)
				.body(assembler.toModel(topicService.findOne(topicId)));
	}

	@PostMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE')")
	public ResponseEntity<?> newTopic(@RequestBody TopicRequestRepresentation blogTopic) {
		EntityModel<?> entity = assembler.toModel(
			topicService.newTopic(blogTopic)
		);
		return ResponseEntity
				.created(entity.getRequiredLink(IanaLinkRelations.SELF).toUri())
				.body(entity);
	}

	@PutMapping(value = "{topicId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE')")
	public ResponseEntity<?> updateTopic(@PathVariable Long topicId, @RequestBody TopicRequestRepresentation blogTopic) {
		EntityModel<?> entity = assembler.toModel(
			topicService.updateTopic(topicId, blogTopic)
		);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{topicId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SERVICE')")
	public ResponseEntity<?> deleteTopic(@PathVariable Long topicId) {
		topicService.deleteTopic(topicId);
		return ResponseEntity.noContent().build();
	}
}
