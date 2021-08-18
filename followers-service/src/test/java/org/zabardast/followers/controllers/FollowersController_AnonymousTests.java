package org.zabardast.followers.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.MediaTypes;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.followers.MockFollowersData;
import org.zabardast.followers.services.FollowerService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class FollowersController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FollowerService followerService;

	private MockFollowersData blogData = new MockFollowersData();

	@Test
	void getAllFollowers() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(
				blogData.AllGuestFollowers.subList(0, Math.min(pageable.getPageSize(), blogData.AllGuestFollowers.size())),
				pageable,
				blogData.AllGuestFollowers.size());

		Mockito.when(followerService.getAllFollowers(MockFollowersData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/{id}/followers", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.followers", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getAllFollowersCustomPaging() throws Exception {

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(
				blogData.AllGuestFollowers.subList(0, Math.min(pageable.getPageSize(), blogData.AllGuestFollowers.size())),
				pageable,
				blogData.AllGuestFollowers.size());

		Mockito.when(followerService.getAllFollowers(MockFollowersData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/{id}/followers?page=0&size=1", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.followers", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}


	@Test
	void getAllFollowing() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(
				blogData.AllGuestFollowing.subList(0, Math.min(pageable.getPageSize(), blogData.AllGuestFollowing.size())),
				pageable,
				blogData.AllGuestFollowing.size());

		Mockito.when(followerService.getAllFollowing(MockFollowersData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/{id}/following", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.following", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void addFollowerRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}/followers", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockFollowersData.objectToJson(blogData.AllGuestFollowers.get(0)));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void removeFollowerRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}/followers", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
