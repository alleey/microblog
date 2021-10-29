package org.zabardast.blog.controllers;

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

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostCommentsController_AdminTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CommentService commentService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void userCanUpdateOthersComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllUserPostComments.get(0);
		CommentResponseRepresentation newComment = MockBlogData
				.createBlogCommentResponse(comment.getId(), "Test", MockBlogData.UserIdGuest, comment.getPostId());
		CommentRequestRepresentation commentRequest = MockBlogData.createBlogCommentRequest("Test");

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId())).then(r -> newComment);
		Mockito.when(commentService.updateComment(comment.getPostId(), comment.getId(), commentRequest))
				.then(r -> newComment);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRequest));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void userCanDeleteOthersComment() throws Exception {

		CommentResponseRepresentation comment = blogData.AllUserPostComments.get(0);

		Mockito.when(commentService.getPostComment(comment.getPostId(), comment.getId())).then(r -> comment);
		Mockito.doNothing().when(commentService).deleteComment(comment.getPostId(), comment.getId());

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", comment.getPostId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT));
	}
}
