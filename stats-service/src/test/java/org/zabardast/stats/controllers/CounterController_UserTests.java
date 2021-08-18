package org.zabardast.stats.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.stats.MockStatsData;
import org.zabardast.stats.dto.CounterRequestRepresentation;
import org.zabardast.stats.model.Counter;
import org.zabardast.stats.services.CounterService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CounterController_UserTests {

	public static final String COUNTER_ID = "test";

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CounterService counterService;

	@Autowired
	ModelMapper modelMapper;

	private MockStatsData blogData = new MockStatsData();

	@Test
	@WithMockUser(username = MockStatsData.UserIdGuest, roles = "USER")
	void addCounters() throws Exception {

		List<CounterRequestRepresentation> cr = Arrays.asList(
			new CounterRequestRepresentation(COUNTER_ID, 1)
		);

		Counter counter = MockStatsData.createCounter(COUNTER_ID, MockStatsData.UserIdGuest, 1);
		Mockito.when(counterService.addCounter(COUNTER_ID,MockStatsData.UserIdGuest, 1)).then(r -> counter);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/stats/counters", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockStatsData.objectToJson(cr));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockStatsData.UserIdGuest, roles = "USER")
	void addCounter() throws Exception {

		Counter counter = MockStatsData.createCounter(COUNTER_ID, MockStatsData.UserIdGuest, 1);
		Mockito.when(counterService.addCounter(COUNTER_ID,MockStatsData.UserIdGuest, 1)).then(r -> counter);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/stats/counters/{id}", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockStatsData.objectToJson(1.0));

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockStatsData.UserIdGuest, roles = "USER")
	void deleteCounter() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/stats/counters/{id}", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}
}
