package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.events.publishers.DomainEventPublisher;
import org.zabardast.blog.services.PostService;
import org.zabardast.blog.services.exceptions.PostAlreadyExistsException;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostsController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PostService postService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanCreatePost() throws Exception {

		PostResponseRepresentation newPost =
				MockBlogData.createBlogPostResponse(100, "Test", "Test", MockBlogData.UserIdGuest, blogData.TopicGeneral);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.newPost(MockBlogData.UserIdGuest, postRequestRepresentation)).then(r -> newPost);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/posts")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userPostRequiresUniqueSlug() throws Exception {

		PostResponseRepresentation newPost = blogData.AllPosts.get(1);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.newPost(MockBlogData.UserIdGuest, postRequestRepresentation))
				.thenThrow(new PostAlreadyExistsException(postRequestRepresentation));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/posts")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CONFLICT));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanUpdateOwnedPost() throws Exception {

		PostResponseRepresentation post = blogData.AlLUserPosts.get(0);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.getPost(post.getId())).then(r -> post);
		Mockito.when(postService.updatePost(post.getId(), postRequestRepresentation)).then(r -> post);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateNonExistingPost() throws Exception {

		PostResponseRepresentation post = blogData.AlLUserPosts.get(0);

		Mockito.when(postService.getPost(post.getId())).thenThrow(new PostNotFoundException(post.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(post));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateOthersPost() throws Exception {

		PostResponseRepresentation post = blogData.AllAdminPosts.get(0);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.getPost(post.getId())).then(r -> post);
		Mockito.when(postService.updatePost(post.getId(), postRequestRepresentation)).then(r -> post);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanDeleteOwnedPost() throws Exception {

		PostResponseRepresentation post = blogData.AlLUserPosts.get(0);

		Mockito.when(postService.getPost(post.getId())).then(r -> post);
		Mockito.doNothing().when(postService).deletePost(post.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanDeleteNonExistingPost() throws Exception {

		PostResponseRepresentation post = blogData.AlLUserPosts.get(0);

		Mockito.when(postService.getPost(post.getId())).thenThrow(new PostNotFoundException(post.getId()));
		Mockito.doNothing().when(postService).deletePost(post.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteOthersPost() throws Exception {

		PostResponseRepresentation post = blogData.AllAdminPosts.get(0);

		Mockito.when(postService.getPost(post.getId())).then(r -> post);
		Mockito.doNothing().when(postService).deletePost(post.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/posts/%d", post.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
