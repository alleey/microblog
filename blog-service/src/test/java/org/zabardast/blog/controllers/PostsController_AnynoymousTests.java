package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.hasValue;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.events.publishers.DomainEventPublisher;
import org.zabardast.blog.services.PostService;
import org.zabardast.blog.services.exceptions.PostNotFoundException;
import java.util.Arrays;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.Operator;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostsController_AnynoymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PostService postService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	void getAllPost() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllPosts.subList(0,pageable.getPageSize()), pageable, blogData.AllPosts.size());
		Mockito.when(postService.getAllPosts(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.posts", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getAllPostsCustomPaging() throws Exception {

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(Arrays.asList(blogData.AllPosts.get(0)), pageable, blogData.AllPosts.size());

		Mockito.when(postService.getAllPosts(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts?page=0&size=1")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.posts", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void searchPosts() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllPosts.subList(0,pageable.getPageSize()), pageable, blogData.AllPosts.size());
		Filter critera = Filter.builder().conditions(
				Arrays.asList(Condition.builder().attribute("title").operator(Operator.EQ).value("something").build())
		).build();

		Mockito.when(postService.getAllFiltered(critera, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/search?q={json}", MockBlogData.objectToJson(critera))
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.posts", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getAllUserPosts() throws Exception {

		Pageable pageable = PageRequest.of(0, 5);
		PageImpl page = new PageImpl(blogData.AllAdminPosts.subList(0,pageable.getPageSize()), pageable, blogData.AllAdminPosts.size());
		Mockito.when(postService.getOwnerPosts(MockBlogData.UserIdAdmin, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get(String.format("/api/v1/users/%s/posts?page=0&size=5", MockBlogData.UserIdAdmin))
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getPostById() throws Exception {

		Mockito.when(postService.getPost(5L)).then(r -> blogData.AllPosts.get(5));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/5")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is(5)))
				.andExpect(jsonPath("$.title", equalTo("Post 5")))
				.andExpect(jsonPath("$._links.self.href", endsWith("/api/v1/posts/5")));
	}

	@Test
	void getNotExistentPost() throws Exception {

		Mockito.when(postService.getPost(100L)).thenThrow(new PostNotFoundException(100L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/100")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	void createNewPostRequiresLogin() throws Exception {

		PostResponseRepresentation newPost = MockBlogData.createBlogPostResponse(100, "Test", "Test", "admin", blogData.TopicGeneral);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/posts")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(newPost));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void updatePostRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/posts/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(blogData.AllPosts.get(0)));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deletePostRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/v1/posts/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
