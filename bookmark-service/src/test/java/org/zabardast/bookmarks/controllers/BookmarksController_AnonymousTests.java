package org.zabardast.bookmarks.controllers;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import javax.ws.rs.core.MediaType;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.MediaTypes;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.bookmarks.MockBookmarkData;
import org.zabardast.bookmarks.dto.BookmarkRepresentation;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.services.BookmarkService;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarksController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private BookmarkService bookmarkService;

	@Autowired
	private ModelMapper modelMapper;

	private MockBookmarkData blogData = new MockBookmarkData();

	@Test
	void getAllBookmarksRequiresLogin() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void getBookmarkByIdRequiresLogin() throws Exception {

		Mockito.when(bookmarkService.getBookmark(5L)).then(r -> blogData.AllBookmarks.get(5));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks/5")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void createNewBookmarkRequiresLogin() throws Exception {

		Bookmark newBookmark = MockBookmarkData.createBookmark(100, "Test", "Test", MockBookmarkData.UserIdGuest);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(newBookmark, BookmarkRepresentation.class);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void updateBookmarkRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/bookmarks/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(blogData.AllBookmarks.get(0)));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}

	@Test
	void deleteBookmarkRequiresLogin() throws Exception {

		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/v1/bookmarks/1")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_UNAUTHORIZED));
	}
}
