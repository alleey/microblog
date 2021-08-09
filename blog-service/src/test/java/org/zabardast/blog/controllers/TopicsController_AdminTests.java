package org.zabardast.blog.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.TopicRepresentation;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.services.TopicService;
import org.zabardast.blog.services.exceptions.TopicAlreadyExistsException;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.config.client.ConfigClientAutoConfiguration;
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

	@Autowired
	private ModelMapper modelMapper;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "ADMIN")
	void adminCanCreateTopic() throws Exception {

		Topic newTopic = MockBlogData.createBlogTopic(100L, "Test");
		TopicRepresentation topicRepresentation = modelMapper.map(newTopic, TopicRepresentation.class);

		Mockito.when(topicService.newTopic(topicRepresentation)).then(r -> newTopic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "ADMIN")
	void adminCreateTopicRequiresUniqueCaption() throws Exception {

		Topic newTopic = blogData.AllTopics.get(1);
		TopicRepresentation topicRepresentation = modelMapper.map(newTopic, TopicRepresentation.class);

		Mockito.when(topicService.newTopic(topicRepresentation)).thenThrow(new TopicAlreadyExistsException(blogData.AllTopics.get(1)));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CONFLICT));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "ADMIN")
	void adminCanUpdateAnyTopic() throws Exception {

		Topic topic = blogData.AllTopics.get(0);
		TopicRepresentation topicRepresentation = modelMapper.map(topic, TopicRepresentation.class);

		Mockito.when(topicService.updateTopic(topic.getId(), topicRepresentation)).then(r -> topic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "ADMIN")
	void adminCannotUpdateNonExistingTopic() throws Exception {

		Topic topic = blogData.AllTopics.get(0);
		TopicRepresentation topicRepresentation = modelMapper.map(topic, TopicRepresentation.class);

		Mockito.when(topicService.updateTopic(topic.getId(), topicRepresentation)).thenThrow(new TopicNotFoundException(topic.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topicRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "ADMIN")
	void adminCanDeleteAnyTopic() throws Exception {

		Topic topic = blogData.AllTopics.get(0);
		Mockito.doNothing().when(topicService).deleteTopic(topic.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}
}
