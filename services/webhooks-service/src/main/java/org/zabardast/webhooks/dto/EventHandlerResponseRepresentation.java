package org.zabardast.webhooks.dto;

import java.util.Date;
import java.util.Set;
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
@Relation(collectionRelation = "eventHandlers")
public class EventHandlerResponseRepresentation {
    private long id;
    private String slug;
    private String title;
    private String text;
    private String owner;
    private Date createdOn;
    private Date updatedOn;
}
