package org.zabardast.stats.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.hateoas.MediaTypes;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.zabardast.stats.MockStatsData;
import org.zabardast.stats.dto.CounterRequestRepresentation;
import org.zabardast.stats.model.CounterStatistics;
import org.zabardast.stats.services.CounterService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CounterController_AnonymousTests {

	public static final String COUNTER_ID = "test";

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CounterService counterService;

	private MockStatsData blogData = new MockStatsData();

	@Test
	void getCounter() throws Exception {

		CounterStatistics cs = CounterStatistics.builder().min(0).avg(1).max(2).count(2).build();

		Mockito.when(counterService.getCounterStatistics(COUNTER_ID)).then(r -> cs);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/v1/stats/counters/{id}", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE));
	}

	@Test
	void addCountersRequiresLogin() throws Exception {

		List<CounterRequestRepresentation> cr = Arrays.asList(
			new CounterRequestRepresentation(COUNTER_ID, 1)
		);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/v1/stats/counters", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockStatsData.objectToJson(cr));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void addCounterRequiresLogin() throws Exception {

		CounterRequestRepresentation cr = new CounterRequestRepresentation(COUNTER_ID, 1);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.put("/api/v1/stats/counters/{id}", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockStatsData.objectToJson(cr));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deleteCounterRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/v1/stats/counters/{id}", COUNTER_ID)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
