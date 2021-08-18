package org.zabardast.blog.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.services.PostService;
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
class PostsController_AdminTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PostService postService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanCreatePost() throws Exception {

		PostResponseRepresentation newPost = MockBlogData
				.createBlogPostResponse(100, "Test", "Test", MockBlogData.UserIdAdmin, blogData.TopicGeneral);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.newPost(MockBlogData.UserIdAdmin, postRequestRepresentation)).then(r -> newPost);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/posts")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanUpdateAnyPost() throws Exception {

		PostResponseRepresentation post = blogData.AlLUserPosts.get(0);
		PostRequestRepresentation postRequestRepresentation = MockBlogData
				.createBlogPostRequest("Test", "Test");

		Mockito.when(postService.getPost(post.getId())).then(r -> post);
		Mockito.when(postService.updatePost(post.getId(), postRequestRepresentation)).then(r -> post);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{id}", post.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(postRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanDeleteAnyPost() throws Exception {

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
}
