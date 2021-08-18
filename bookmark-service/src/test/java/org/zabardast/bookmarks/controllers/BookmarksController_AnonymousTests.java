package org.zabardast.bookmarks.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.bookmarks.MockBookmarkData;
import org.zabardast.bookmarks.dto.BookmarkRequestRepresentation;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.services.BookmarkService;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarksController_AnonymousTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
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

		BookmarkResponseRepresentation newBookmark = MockBookmarkData
				.createBookmarkResponse(100, "Test", "Test", MockBookmarkData.UserIdGuest);
		BookmarkRequestRepresentation bookmarkRequestRepresentation = modelMapper.map(newBookmark, BookmarkRequestRepresentation.class);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRequestRepresentation));

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
