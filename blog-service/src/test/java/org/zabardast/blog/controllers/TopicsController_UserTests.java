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
class TopicsController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private TopicService topicService;

	@Autowired
	private ModelMapper modelMapper;

	private MockBlogData blogData = new MockBlogData();

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotCreateTopic() throws Exception {

		TopicRepresentation newTopic = modelMapper.map(
				MockBlogData.createBlogTopic(100L, "Test"), TopicRepresentation.class);
		Mockito.when(topicService.newTopic(newTopic)).then(r -> newTopic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(newTopic));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotUpdateTopic() throws Exception {

		Topic topic = blogData.TopicGeneral;
		TopicRepresentation topicRepresentation = modelMapper.map(topic, TopicRepresentation.class);

		Mockito.when(topicService.updateTopic(topic.getId(), topicRepresentation)).then(r -> topic);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(topic));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBlogData.UserIdGuest, roles = "USER")
	void userCannotDeleteTopic() throws Exception {

		Topic topic = blogData.TopicGeneral;
		Mockito.doNothing().when(topicService).deleteTopic(topic.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/topics/%d", topic.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
