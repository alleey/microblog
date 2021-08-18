package org.zabardast.blog.dto;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "comments")
public class CommentResponseRepresentation {
    private long id;
    private String owner;
    private String text;
    private Date createdOn;
    private Date updatedOn;
    private long postId;
}
