package org.zabardast.userprofile.services;

import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zabardast.userprofile.dto.keycloak.KeycloakCreateUserRequestRepresentation;
import org.zabardast.userprofile.dto.keycloak.KeycloakUserRepresentation;

@FeignClient(name = "keycloak", url = "${service.keycloak.profiles-url}")
public interface KeycloakService {
    @GetMapping("users")
    List<KeycloakUserRepresentation> users(@RequestParam("first") int first, @RequestParam("max") int max);

    @GetMapping("users/count")
    int usersCount();

    @PostMapping("users")
    ResponseEntity<Void> create(KeycloakCreateUserRequestRepresentation request);

    @DeleteMapping("users/{userId}")
    ResponseEntity<Void> delete(@PathVariable String userId);
}
