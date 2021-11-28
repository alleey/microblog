package org.zabardast.userprofile.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.userprofile.MockUserProfileData;
import org.zabardast.userprofile.services.UserProfileService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserProfilesController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserProfileService userProfileService;

	private MockUserProfileData blogData = new MockUserProfileData();
//
//	@Test
//	void getAllUserProfilesRequiresLogin() throws Exception {
//
//		Pageable pageable = PageRequest.of(0, 20);
//		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/users")
//				.accept(MediaType.APPLICATION_JSON);
//
//		mockMvc.perform(requestBuilder)
//				.andExpect(status().is(HttpStatus.SC_OK));
//	}
//
//	@Test
//	void getUserProfileByIdRequiresLogin() throws Exception {
//
//		Mockito.when(userProfileService.getUserProfile(MockUserProfileData.UserIdGuest)).then(r -> blogData.AllUserProfiles.get(0));
//		RequestBuilder requestBuilder = MockMvcRequestBuilders
//				.get("/api/v1/users/{id}", MockUserProfileData.UserIdGuest)
//				.accept(MediaType.APPLICATION_JSON);
//
//		mockMvc.perform(requestBuilder)
//				.andExpect(status().is(HttpStatus.SC_OK));
//	}

	@Test
	void updateUserProfileRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}", MockUserProfileData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(blogData.AllUserProfiles.get(0)));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deleteUserProfileRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}", MockUserProfileData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
