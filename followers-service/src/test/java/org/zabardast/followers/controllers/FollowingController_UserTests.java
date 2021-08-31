package org.zabardast.followers.controllers;

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
import org.zabardast.followers.MockFollowersData;
import org.zabardast.followers.dto.FollowRequestRepresentation;
import org.zabardast.followers.dto.FollowResponseRepresentation;
import org.zabardast.followers.services.FollowingService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class FollowingController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FollowingService followingService;

	@Autowired
	ModelMapper modelMapper;

	private MockFollowersData blogData = new MockFollowersData();

	@Test
	@WithMockUser(username = MockFollowersData.UserIdGuest, roles = "USER")
	void userCanAddFollowerToOwn() throws Exception {

		FollowRequestRepresentation request = FollowRequestRepresentation.builder()
				.userId(MockFollowersData.UserIdAdmin)
				.userName("Admin")
				.build();

		FollowResponseRepresentation follower = MockFollowersData.createFollowingResponse(MockFollowersData.UserIdGuest);
		Mockito.when(followingService
				.follow(MockFollowersData.UserIdGuest, request))
				.then(r -> follower);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}/following", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockFollowersData.objectToJson(request));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockFollowersData.UserIdGuest, roles = "USER")
	void userCanRemoveFollowerFromOwn() throws Exception {

		Mockito.doNothing().when(followingService)
				.unfollow(MockFollowersData.UserIdAdmin, MockFollowersData.UserIdGuest);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}/following/{follower}", MockFollowersData.UserIdGuest, MockFollowersData.UserIdAdmin)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}

	@Test
	@WithMockUser(username = MockFollowersData.UserIdGuest, roles = "USER")
	void userCannotAddFollowerToOther() throws Exception {

		FollowRequestRepresentation request = FollowRequestRepresentation.builder()
				.userId(MockFollowersData.UserIdAdmin)
				.userName("Admin")
				.build();

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}/following", MockFollowersData.UserIdService)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockFollowersData.objectToJson(request));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockFollowersData.UserIdGuest, roles = "USER")
	void userCannotRemoveFollowerFromOther() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}/following/{follower}", MockFollowersData.UserIdService, MockFollowersData.UserIdAdmin)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
