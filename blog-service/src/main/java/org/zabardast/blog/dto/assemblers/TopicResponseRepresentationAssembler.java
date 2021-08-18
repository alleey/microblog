package org.zabardast.blog.dto.assemblers;

import org.zabardast.blog.controllers.TopicsController;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.model.Topic;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class TopicResponseRepresentationAssembler implements
        RepresentationModelAssembler<TopicResponseRepresentation, EntityModel<TopicResponseRepresentation>>
{
    @Override
    public EntityModel<TopicResponseRepresentation> toModel(TopicResponseRepresentation blogTopic) {
        return EntityModel.of(
                blogTopic,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(TopicsController.class)
                .getTopicById(blogTopic.getId()))
                .withSelfRel()
//            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(TopicsController.class)
//                .getOwnersTopics()))
//                .withRel("licenses")
        );
    }
}
