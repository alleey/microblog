package org.zabardast.blog.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.events.publishers.DomainEventPublisher;
import org.zabardast.blog.services.TopicService;
import org.zabardast.blog.services.exceptions.TopicAlreadyExistsException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
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
class TopicsController_AdminTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private TopicService topicService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanCreateTopic() throws Exception {

		TopicResponseRepresentation newTopic = MockBlogData.createBlogTopicResponse(100L, "Test");
		TopicRequestRepresentation topicRequest = MockBlogData.createBlogTopicRequest("Test");

		Mockito.when(topicService.newTopic(topicRequest)).then(r -> newTopic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCreateTopicRequiresUniqueCaption() throws Exception {

		TopicResponseRepresentation newTopic = blogData.AllTopics.get(1);
		TopicRequestRepresentation topicRequest = MockBlogData.createBlogTopicRequest("Test");

		Mockito.when(topicService.newTopic(topicRequest))
				.thenThrow(new TopicAlreadyExistsException(newTopic));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CONFLICT));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanUpdateAnyTopic() throws Exception {

		TopicResponseRepresentation topic = blogData.AllTopics.get(0);
		TopicRequestRepresentation topicRequest = MockBlogData.createBlogTopicRequest("Test");

		Mockito.when(topicService.updateTopic(topic.getId(), topicRequest)).then(r -> topic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCannotUpdateNonExistingTopic() throws Exception {

		TopicResponseRepresentation topic = blogData.AllTopics.get(0);
		TopicRequestRepresentation topicRequest = MockBlogData.createBlogTopicRequest("Test");

		Mockito.when(topicService.updateTopic(topic.getId(), topicRequest)).thenThrow(new TopicNotFoundException(topic.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRequest));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdAdmin, roles = "ADMIN")
	void adminCanDeleteAnyTopic() throws Exception {

		TopicResponseRepresentation topic = blogData.AllTopics.get(0);

		Mockito.doNothing().when(topicService).deleteTopic(topic.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}
}
