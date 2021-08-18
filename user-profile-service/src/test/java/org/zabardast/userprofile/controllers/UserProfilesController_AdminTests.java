package org.zabardast.userprofile.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.userprofile.MockUserProfileData;
import org.zabardast.userprofile.dto.UserProfileRequestRepresentation;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.services.UserProfileService;
import org.zabardast.userprofile.services.exceptions.UserProfileNotFoundException;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserProfilesController_AdminTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserProfileService userProfileService;

	@Autowired
	ModelMapper modelMapper;

	private MockUserProfileData blogData = new MockUserProfileData();

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdAdmin, roles = "ADMIN")
	void adminCanUpdateAnyUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllUserProfiles.get(0);
		UserProfileRequestRepresentation userProfileRequestRepresentation = modelMapper.map(userProfile, UserProfileRequestRepresentation.class);

		Mockito.when(userProfileService.updateUserProfile(userProfile.getId(), userProfileRequestRepresentation, false)).then(r -> userProfile);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/users/%s", userProfile.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(userProfileRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdAdmin, roles = "ADMIN")
	void adminCannotUpdateNonExistingUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllUserProfiles.get(0);
		UserProfileRequestRepresentation userProfileRequestRepresentation = modelMapper.map(userProfile, UserProfileRequestRepresentation.class);

		Mockito.when(userProfileService.updateUserProfile(userProfile.getId(), userProfileRequestRepresentation, false))
				.thenThrow(new UserProfileNotFoundException(userProfile.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/users/%s", userProfile.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(userProfileRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdAdmin, roles = "ADMIN")
	void adminCanDeleteAnyUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllUserProfiles.get(0);
		Mockito.doNothing().when(userProfileService).deleteUserProfile(userProfile.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/users/%s", userProfile.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}
}
