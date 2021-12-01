package org.zabardast.webhooks.dto.assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.webhooks.dto.TopicResponseRepresentation;

@Component
public class TopicResponseRepresentationAssembler implements
    RepresentationModelAssembler<TopicResponseRepresentation, EntityModel<TopicResponseRepresentation>> {
    @Override
    public EntityModel<TopicResponseRepresentation> toModel(TopicResponseRepresentation webhooksTopic) {

        return EntityModel.of(
            webhooksTopic,
            WebMvcLinkBuilder.linkTo(
                    WebMvcLinkBuilder.methodOn(TopicsController.class).getTopicById(webhooksTopic.getId())
                )
                .withSelfRel()
//            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(TopicsController.class)
//                .getOwnersTopics()))
//                .withRel("licenses")
        );
    }
}
