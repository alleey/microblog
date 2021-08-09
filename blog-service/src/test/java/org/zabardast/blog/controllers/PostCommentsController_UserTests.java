package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.any;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.stream.Collectors;
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
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.CommentRepresentation;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.PostService;
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

	@Autowired
	private ModelMapper modelMapper;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanPostComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment newComment = MockBlogData.createBlogComment(100, "Test", MockBlogData.UserIdGuest);
		CommentRepresentation commentRepresentation = modelMapper.map(newComment, CommentRepresentation.class);

		Mockito.when(commentService.newComment(post.getId(), MockBlogData.UserIdGuest, commentRepresentation)).then(r -> {
			newComment.setPost(post);
			return newComment;
		});
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/posts/{post}/comments", post.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotPostCommentToNonExistentPost() throws Exception {

		Comment newComment = MockBlogData.createBlogComment(100, "Test", MockBlogData.UserIdGuest);
		CommentRepresentation commentRepresentation = modelMapper.map(newComment, CommentRepresentation.class);

		Mockito.when(commentService.newComment(10000L, MockBlogData.UserIdGuest, commentRepresentation))
				.thenThrow(new PostNotFoundException(10000L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/posts/10000/comments")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanUpdateOwnedComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(0);
		Comment newComment = MockBlogData.createBlogComment(100, "Test", MockBlogData.UserIdGuest);
		CommentRepresentation commentRepresentation = modelMapper.map(newComment, CommentRepresentation.class);

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId())).then(r -> comment);
		Mockito.when(commentService.updateComment(post.getId(), comment.getId(), commentRepresentation))
				.then(r -> {
					newComment.setPost(post);
					return newComment;
				});
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateNonExistingComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(0); // First comment is from User
		Comment newComment = MockBlogData.createBlogComment(100, "Test", MockBlogData.UserIdGuest);
		CommentRepresentation commentRepresentation = modelMapper.map(newComment, CommentRepresentation.class);

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId()))
				.thenThrow(new CommentNotFoundException(comment.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}


	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateOthersComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(1); // Admin has second comment
		Comment newComment = MockBlogData.createBlogComment(100, "Test", MockBlogData.UserIdGuest);
		CommentRepresentation commentRepresentation = modelMapper.map(newComment, CommentRepresentation.class);

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId())).then(r -> comment);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(commentRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCanDeleteOwnedComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(0);

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId())).then(r -> comment);
		Mockito.doNothing().when(commentService).deleteComment(post.getId(), comment.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteNonExistngComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(0);

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId()))
				.thenThrow(new CommentNotFoundException(comment.getId()));
		Mockito.doNothing().when(commentService).deleteComment(post.getId(), comment.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteOthersComment() throws Exception {

		Post post = blogData.AlLUserPosts.get(0);
		Comment comment = post.getComments().get(1); // Admin has second comment

		Mockito.when(commentService.getPostComment(post.getId(), comment.getId())).then(r -> comment);
		Mockito.doNothing().when(commentService).deleteComment(post.getId(), comment.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/posts/{post}/comments/{comment}", post.getId(), comment.getId())
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}