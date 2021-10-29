package org.zabardast.blog.dto;

import java.util.Date;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;
import org.zabardast.blog.model.Topic;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "posts")
public class PostResponseRepresentation {
    private long id;
    private String slug;
    private String title;
    private String text;
    private String owner;
    private Date createdOn;
    private Date updatedOn;
    private Set<TopicResponseRepresentation> topics;
}
