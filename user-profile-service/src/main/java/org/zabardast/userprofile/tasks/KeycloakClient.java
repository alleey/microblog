package org.zabardast.userprofile.tasks;

import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zabardast.userprofile.dto.KeycloakUserRepresentation;

@FeignClient(name = "keycloak", url = "${service.keycloak.profiles-url}")
public interface KeycloakClient {
    @GetMapping("users")
    List<KeycloakUserRepresentation> users(@RequestParam("first") int first,
                                           @RequestParam("max") int max);

    @GetMapping("users/count")
    int usersCount();
}
