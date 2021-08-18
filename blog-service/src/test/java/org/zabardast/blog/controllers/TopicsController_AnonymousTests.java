package org.zabardast.blog.controllers;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.zabardast.blog.MockBlogData;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.services.TopicService;
import org.zabardast.blog.services.exceptions.TopicNotFoundException;
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
class TopicsController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private TopicService topicService;

	private MockBlogData blogData = new MockBlogData();

	@Test
	void getAllTopics() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllTopics.subList(0,pageable.getPageSize()), pageable, blogData.AllTopics.size());
		Mockito.when(topicService.getAllTopics(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.topics", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getAllTopicsCustomPaging() throws Exception {

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(Arrays.asList(blogData.AllTopics.get(0)), pageable, blogData.AllTopics.size());
		Mockito.when(topicService.getAllTopics(pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/topics?page=0&size=1")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.topics", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void searchTopics() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllTopics.subList(0,pageable.getPageSize()), pageable, blogData.AllTopics.size());
		Filter critera = Filter.builder().conditions(
			Arrays.asList(Condition.builder().attribute("caption").operator(Operator.EQ).value("something").build())
		).build();

		Mockito.when(topicService.getAllFiltered(critera, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/topics/search?q={json}", MockBlogData.objectToJson(critera))
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.topics", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	void getTopicById() throws Exception {

		Mockito.when(topicService.findOne(5L)).then(r -> blogData.AllTopics.get(5));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/topics/5")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is(5)))
				.andExpect(jsonPath("$.caption", equalTo(blogData.AllTopics.get(5).getCaption())))
				.andExpect(jsonPath("$._links.self.href", endsWith("/api/v1/topics/5")));
	}

	@Test
	void getNotExistentTopic() throws Exception {

		Mockito.when(topicService.findOne(100L)).thenThrow(new TopicNotFoundException(100L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/topics/100")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	void createNewTopicRequiresLogin() throws Exception {

		TopicResponseRepresentation newTopic = MockBlogData.createBlogTopicResponse(100L, "Test");
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/topics")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(newTopic));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void updateTopicRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/topics/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBlogData.objectToJson(blogData.AllTopics.get(0)));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deleteTopicRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/v1/topics/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
