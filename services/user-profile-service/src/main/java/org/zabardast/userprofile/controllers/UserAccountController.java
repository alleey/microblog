
package org.zabardast.userprofile.controllers;

import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.ExposesResourceFor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zabardast.userprofile.dto.RegisterRequestRepresentation;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.services.UserAccountService;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users/accounts")
@ExposesResourceFor(UserProfile.class)
public class UserAccountController {

	@Autowired
	UserAccountService userAccountService;

	@PostMapping()
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> register(@NotNull @RequestBody RegisterRequestRepresentation account) {
		userAccountService.register(account);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping(value = "{userId}")
	@PreAuthorize("isAuthenticated")
	public ResponseEntity<?> unregister(@PathVariable String userId) {
		userAccountService.unregister(userId);
		return ResponseEntity.noContent().build();
	}
}
