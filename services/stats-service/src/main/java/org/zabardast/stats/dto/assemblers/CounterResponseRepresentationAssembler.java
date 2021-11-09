package org.zabardast.stats.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.stats.controllers.CounterController;
import org.zabardast.stats.dto.CounterResponseRepresentation;

@Component
public class CounterResponseRepresentationAssembler implements
        RepresentationModelAssembler<CounterResponseRepresentation, EntityModel<CounterResponseRepresentation>>
{
    @Override
    public EntityModel<CounterResponseRepresentation> toModel(CounterResponseRepresentation counter) {
        return EntityModel.of(
            counter,
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder
                    .methodOn(CounterController.class)
                    .getCounterStatistics(counter.getCounter())
            ).withRel("stats")
        );
    }
}
