package org.zabardast.stats.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.stats.controllers.CounterController;
import org.zabardast.stats.dto.CounterStatisticsResponseRepresentation;

@Component
public class CounterStatisticsResponseRepresentationAssembler implements
        RepresentationModelAssembler<CounterStatisticsResponseRepresentation, EntityModel<CounterStatisticsResponseRepresentation>>
{
    @Override
    public EntityModel<CounterStatisticsResponseRepresentation> toModel(CounterStatisticsResponseRepresentation counter) {
        return EntityModel.of(
            counter,
            WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder
                    .methodOn(CounterController.class)
                    .getCounterStatistics(counter.getCounter())
            ).withSelfRel()
        );
    }
}
