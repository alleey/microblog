package org.zabardast.userprofile.controllers;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
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
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.MediaTypes;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.Operator;
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
class UserProfilesController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserProfileService userProfileService;

	@Autowired
	ModelMapper modelMapper;

	private MockUserProfileData blogData = new MockUserProfileData();

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void getAllUserProfiles() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllUserProfiles.subList(0,pageable.getPageSize()), pageable, blogData.AllUserProfiles.size());
		Mockito.when(userProfileService.getAllUserProfiles(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.userprofiles", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void getAllUserProfilesCustomPaging() throws Exception {

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(Arrays.asList(blogData.AllUserProfiles.get(0)), pageable, blogData.AllUserProfiles.size());
		Mockito.when(userProfileService.getAllUserProfiles(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users?page=0&size=1")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.userprofiles", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void searchUserProfiles() throws Exception {

		Pageable pageable = PageRequest.of(0, 3);
		PageImpl page = new PageImpl(blogData.AllUserProfiles.subList(0,pageable.getPageSize()), pageable, blogData.AllUserProfiles.size());
		Filter criteria = Filter.builder().conditions(
			Arrays.asList(Condition.builder().attribute("firName").operator(Operator.EQ).value("something").build())
		).build();

		Mockito.when(userProfileService.getAllFiltered(criteria, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/search?size=3&q={json}", MockUserProfileData.objectToJson(criteria))
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.userprofiles", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void getUserProfileById() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllUserProfiles.get(0);
		Mockito.when(userProfileService.getUserProfile(MockUserProfileData.UserIdGuest)).then(r -> userProfile);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/{id}", MockUserProfileData.UserIdGuest)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is(userProfile.getId())))
				.andExpect(jsonPath("$.username", equalTo(userProfile.getUsername())))
				.andExpect(jsonPath("$._links.self.href", endsWith("/api/v1/users/" + userProfile.getId())));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void getNotExistentUserProfile() throws Exception {

		Mockito.when(userProfileService.getUserProfile("Absent")).thenThrow(new UserProfileNotFoundException("Absent"));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/users/Absent")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCanUpdateOwnedUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AlLNonAdminProfiles.get(0);
		UserProfileRequestRepresentation userProfileRequestRepresentation = modelMapper.map(userProfile, UserProfileRequestRepresentation.class);

		Mockito.when(userProfileService.getUserProfile(userProfile.getId())).then(r -> userProfile);
		Mockito.when(userProfileService.updateUserProfile(userProfile.getId(), userProfileRequestRepresentation, false)).then(r -> userProfile);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}", userProfile.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(userProfileRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCannotUpdateNonExistingUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AlLNonAdminProfiles.get(0);
		UserProfileRequestRepresentation userProfileRequestRepresentation = modelMapper.map(userProfile, UserProfileRequestRepresentation.class);

		Mockito.when(userProfileService.updateUserProfile("Absent", userProfileRequestRepresentation, false))
				.thenThrow(new UserProfileNotFoundException(userProfile.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/Absent")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(userProfileRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCannotUpdateOthersUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllAdminUserProfiles.get(0);
		UserProfileRequestRepresentation userProfileRequestRepresentation = modelMapper.map(userProfile, UserProfileRequestRepresentation.class);

		Mockito.when(userProfileService.getUserProfile(userProfile.getId())).then(r -> userProfile);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/users/{id}", userProfile.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockUserProfileData.objectToJson(userProfileRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCanDeleteOwnedUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AlLNonAdminProfiles.get(0);
		Mockito.when(userProfileService.getUserProfile(userProfile.getId())).then(r -> userProfile);
		Mockito.doNothing().when(userProfileService).deleteUserProfile(userProfile.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}", userProfile.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCannotDeleteNonExistingUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AlLNonAdminProfiles.get(0);

		Mockito.when(userProfileService.getUserProfile("Absent"))
				.thenThrow(new UserProfileNotFoundException(userProfile.getId()));
		Mockito.doNothing().when(userProfileService).deleteUserProfile(userProfile.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/Absent")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockUserProfileData.UserIdGuest, roles = "USER")
	void userCannotDeleteOthersUserProfile() throws Exception {

		UserProfileResponseRepresentation userProfile = blogData.AllAdminUserProfiles.get(0);
		
		Mockito.when(userProfileService.getUserProfile(userProfile.getId())).then(r -> userProfile);
		Mockito.doNothing().when(userProfileService).deleteUserProfile(userProfile.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/users/{id}", userProfile.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
