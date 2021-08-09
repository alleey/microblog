package org.zabardast.blog.model.assemblers;

import org.zabardast.blog.controllers.TopicsController;
import org.zabardast.blog.model.Topic;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class TopicModelAssembler implements RepresentationModelAssembler<Topic, EntityModel<Topic>> {
    
    @Override
    public EntityModel<Topic> toModel(Topic blogTopic) {
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
