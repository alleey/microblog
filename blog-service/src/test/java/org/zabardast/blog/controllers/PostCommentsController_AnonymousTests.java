package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.CommentRequestRepresentation;
import org.zabardast.blog.dto.CommentResponseRepresentation;
import org.zabardast.blog.events.publishers.DomainEventPublisher;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.exceptions.CommentNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
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

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostCommentsController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CommentService commentService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	void getAllPostComments() throws Exception {

		List<CommentResponseRepresentation> comments = blogData.AllUserPostComments;

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(comments, pageable, comments.size());

		Mockito.when(commentService.getPostComments(1L, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/1/comments")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.comments", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getAllPostCommentsCustomPaging() throws Exception {

		List<CommentResponseRepresentation> comments = blogData.AllUserPostComments;

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(comments.subList(0,pageable.getPageSize()), pageable, comments.size());

		Mockito.when(commentService.getPostComments(1L, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/1/comments?page=0&size=1")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.comments", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getCommentById() throws Exception {

		CommentResponseRepresentation comment = blogData.AllUserPostComments.get(0);

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId())).then(r -> {
			return comment;
		});
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/posts/{postId}/comments/{commentId}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is((int)comment.getId())))
				.andExpect(jsonPath("$.text", equalTo(comment.getText())))
				.andExpect(jsonPath("$._links.self.href",
						endsWith(String.format("/api/v1/posts/%d/comments/%d", comment.getPostId(), comment.getId()))));
	}

	@Test
	void getNotExistentComment() throws Exception {

		Mockito.when(commentService.getPostComment(1L, 100L)).thenThrow(new CommentNotFoundException(100L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/posts/1/comments/100")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	void createNewCommentRequiresLogin() throws Exception {

		CommentRequestRepresentation newComment = MockBlogData.createBlogCommentRequest("Test");
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/posts/1/comments")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(newComment));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void updateCommentRequiresLogin() throws Exception {

		CommentRequestRepresentation newComment = MockBlogData.createBlogCommentRequest("Test");
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/posts/1/comments/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(newComment));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deleteCommentRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/v1/posts/1/comments/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
