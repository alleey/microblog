
package org.zabardast.stats.controllers;

import java.util.List;
import java.util.stream.Collectors;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.stats.dto.BatchCounterRequestRepresentation;
import org.zabardast.stats.dto.CounterRequestRepresentation;
import org.zabardast.stats.dto.CounterResponseRepresentation;
import org.zabardast.stats.dto.CounterStatisticsResponseRepresentation;
import org.zabardast.stats.dto.assemblers.CounterResponseRepresentationAssembler;
import org.zabardast.stats.dto.assemblers.CounterStatisticsResponseRepresentationAssembler;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.services.CounterService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/counters")
@ExposesResourceFor(Counter.class)
public class CounterController {

	@Autowired
    CounterService counterService;

	@Autowired
	CounterResponseRepresentationAssembler counterResponseRepresentationAssembler;

	@Autowired
	CounterStatisticsResponseRepresentationAssembler counterStatisticsResponseRepresentationAssembler;

	@Autowired
	PagedResourcesAssembler<CounterResponseRepresentation> pagedAssembler;

	@GetMapping("{counter}/stats")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getCounterStatistics(@PathVariable String counter) {

		EntityModel<?> entity = counterStatisticsResponseRepresentationAssembler.toModel(
			CounterStatisticsResponseRepresentation.builder()
				.counter(counter)
				.statistics(counterService.getCounterStatistics(counter))
				.build()
		);

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entity);
	}

	@GetMapping("{counter}/users")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getCounterOwners(@PathVariable String counter, final Pageable page)
	{
		PagedModel<?> entities = pagedAssembler.toModel(
			counterService.getAllCounters(counter, page),
			counterResponseRepresentationAssembler
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@GetMapping("{counter}")
	//@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> getCounter(@PathVariable String counter, Authentication authentication) {
		EntityModel<?> entity = counterResponseRepresentationAssembler.toModel(
			counterService.getCounter(authentication.getName(), counter)
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entity);
	}

	@PostMapping("batch")
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> batchUpdate(@RequestBody List<BatchCounterRequestRepresentation> counters, Authentication authentication) {

		List<?> entities = counters.stream()
				.filter(item -> item.getOperation().equalsIgnoreCase("update"))
				.map(item -> counterService.addCounter(item.getCounter(), authentication.getName(), item.getValue()))
				.collect(Collectors.toList());
		counters.stream()
				.filter(item -> item.getOperation().equalsIgnoreCase("delete"))
				.forEach(item -> counterService.deleteCounter(item.getCounter(), authentication.getName()));

		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@PostMapping()
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> addCounters(@RequestBody List<CounterRequestRepresentation> counters, Authentication authentication) {
		List<?> entities = counters.stream()
			.map(item -> counterService.addCounter(item.getCounter(), authentication.getName(), item.getValue()))
			.collect(Collectors.toList());
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entities);
	}

	@PutMapping("{counter}")
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> addCounter(@PathVariable String counter, @RequestBody double value, Authentication authentication) {

		EntityModel<?> entity = counterResponseRepresentationAssembler.toModel(
			counterService.addCounter(counter, authentication.getName(), value)
		);
		return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON).body(entity);
	}

	@DeleteMapping(value = "{counter}")
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> deleteCounter(@PathVariable String counter, Authentication authentication) {
		counterService.deleteCounter(counter, authentication.getName());
		return ResponseEntity.noContent().build();
	}
}
