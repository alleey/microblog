package org.zabardast.bookmarks.dto;

import java.util.Date;
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
@Relation(collectionRelation = "bookmarks")
public class BookmarkResponseRepresentation {
    private long id;
    private String caption;
    private String url;
    private String owner;
    private Date createdOn;
}
