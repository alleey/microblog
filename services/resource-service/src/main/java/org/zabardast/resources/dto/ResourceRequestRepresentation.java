package org.zabardast.resources.dto;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestPart;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@ToString
@Validated
public class ResourceRequestRepresentation {
    public static final String VALID_NAME_PATTERN = "^[A-za-z0-9.-]{1,255}$";

    @Pattern(regexp = VALID_NAME_PATTERN) private String resource;
    @Pattern(regexp = VALID_NAME_PATTERN) private String key;
    private String contentType;
    private String location;
}
