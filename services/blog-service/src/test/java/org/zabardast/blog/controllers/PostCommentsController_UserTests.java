package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.CommentRequestRepresentation;
import org.zabardast.blog.dto.CommentResponseRepresentation;
import org.zabardast.blog.events.publishers.DomainEventPublisher;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.exceptions.CommentNotFoundException;
import org.zabardast.blog.services.exceptions.PostNotFoundException;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostCommentsController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CommentService commentService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanPostComment() throws Exception {

		CommentResponseRepresentation newComment = MockBlogData
				.createBlogCommentResponse(1L, "Test", MockBlogData.UserIdGuest, 1L);
		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.newComment(1L, MockBlogData.UserIdGuest, commentRequest)).then(r -> newComment);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/posts/1/comments")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotPostCommentToNonExistentPost() throws Exception {

		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.newComment(10000L, MockBlogData.UserIdGuest, commentRequest))
				.thenThrow(new PostNotFoundException(10000L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/posts/10000/comments")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanUpdateOwnedComment() throws Exception {

		CommentResponseRepresentation newComment = MockBlogData
				.createBlogCommentResponse(1L, "Test", MockBlogData.UserIdGuest, 1L);
		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.getPostComment(newComment.getPostId(), newComment.getId())).then(r -> newComment);
		Mockito.when(commentService.updateComment(newComment.getPostId(), newComment.getId(), commentRequest))
				.then(r -> newComment);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", newComment.getPostId(), newComment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateNonExistingComment() throws Exception {

		CommentResponseRepresentation newComment = MockBlogData
				.createBlogCommentResponse(1L, "Test", MockBlogData.UserIdGuest, 1L);
		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.getPostComment(newComment.getPostId(), newComment.getId()))
				.thenThrow(new CommentNotFoundException(newComment.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", newComment.getPostId(), newComment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}


	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateOthersComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllAdminPostComments.get(0);
		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId()))
				.then(r -> comment);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanDeleteOwnedComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllUserPostComments.get(0);

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId())).then(r -> comment);
		Mockito.doNothing().when(commentService).deleteComment(comment.getPostId(), comment.getId());

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteNonExistngComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllUserPostComments.get(0);

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId()))
				.thenThrow(new CommentNotFoundException(comment.getId()));
		Mockito.doNothing().when(commentService).deleteComment(comment.getPostId(), comment.getId());

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteOthersComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllAdminPostComments.get(0);

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId())).then(r -> comment);
		Mockito.doNothing().when(commentService).deleteComment(comment.getPostId(), comment.getId());

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
