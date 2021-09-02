package org.zabardast.followers.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.followers.MockFollowersData;
import org.zabardast.followers.services.FollowingService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class FollowingController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FollowingService followingService;

	private MockFollowersData blogData = new MockFollowersData();

	@Test
	void getAllFollowing() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(
				blogData.AllGuestFollowing.subList(0, Math.min(pageable.getPageSize(), blogData.AllGuestFollowing.size())),
				pageable,
				blogData.AllGuestFollowing.size());

		Mockito.when(followingService.listFollowing(MockFollowersData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/{userId}/following", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.follows", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void addFollowerRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/users/{userId}/following", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockFollowersData.objectToJson(blogData.AllGuestFollowers.get(0)));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void removeFollowerRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{userId}/following", MockFollowersData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
