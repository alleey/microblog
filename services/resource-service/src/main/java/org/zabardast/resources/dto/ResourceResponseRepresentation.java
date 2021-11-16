package org.zabardast.resources.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.core.io.Resource;
import org.springframework.hateoas.server.core.Relation;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "resources")
@JsonIgnoreProperties(value = { "contentLocation", "contents" })
@ToString
public class ResourceResponseRepresentation {
    private String owner;
    private String resource;
    private String key;
    private String contentType;
    private Date createdOn;
    private Date updatedOn;
    @JsonIgnore
    private String contentLocation;
    @JsonIgnore
    private Resource contents;
}
