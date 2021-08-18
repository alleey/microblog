package org.zabardast.bookmarks.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
import org.springframework.security.test.context.support.WithMockUser;
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
import org.zabardast.bookmarks.services.exceptions.BookmarkAlreadyExistsException;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarksController_AdminTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private BookmarkService bookmarkService;

	@Autowired
	private ModelMapper modelMapper;

	private MockBookmarkData blogData = new MockBookmarkData();

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdAdmin, roles = "ADMIN")
	void adminCanCreateBookmark() throws Exception {

		BookmarkResponseRepresentation newBookmark = MockBookmarkData
				.createBookmarkResponse(100, "Test", "Test", MockBookmarkData.UserIdGuest);
		BookmarkRequestRepresentation bookmarkRequestRepresentation = modelMapper.map(newBookmark, BookmarkRequestRepresentation.class);

		Mockito.when(bookmarkService.newBookmark(MockBookmarkData.UserIdAdmin, bookmarkRequestRepresentation)).then(r -> newBookmark);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdAdmin, roles = "ADMIN")
	void adminCreateBookmarkRequiresUniqueCaption() throws Exception {

		BookmarkResponseRepresentation newBookmark = blogData.AllBookmarks.get(1);
		BookmarkRequestRepresentation bookmarkRequestRepresentation = modelMapper.map(newBookmark, BookmarkRequestRepresentation.class);

		Mockito.when(bookmarkService.newBookmark(MockBookmarkData.UserIdAdmin, bookmarkRequestRepresentation))
				.thenThrow(new BookmarkAlreadyExistsException(blogData.AllBookmarks.get(1)));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CONFLICT));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdAdmin, roles = "ADMIN")
	void adminCanUpdateAnyBookmark() throws Exception {

		BookmarkResponseRepresentation bookmark = blogData.AllBookmarks.get(0);
		BookmarkRequestRepresentation bookmarkRequestRepresentation = modelMapper.map(bookmark, BookmarkRequestRepresentation.class);

		Mockito.when(bookmarkService.updateBookmark(bookmark.getId(), bookmarkRequestRepresentation)).then(r -> bookmark);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdAdmin, roles = "ADMIN")
	void adminCannotUpdateNonExistingBookmark() throws Exception {

		BookmarkResponseRepresentation bookmark = blogData.AllBookmarks.get(0);
		BookmarkRequestRepresentation bookmarkRequestRepresentation = modelMapper.map(bookmark, BookmarkRequestRepresentation.class);

		Mockito.when(bookmarkService.updateBookmark(bookmark.getId(), bookmarkRequestRepresentation))
				.thenThrow(new BookmarkNotFoundException(bookmark.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRequestRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdAdmin, roles = "ADMIN")
	void adminCanDeleteAnyBookmark() throws Exception {

		BookmarkResponseRepresentation bookmark = blogData.AllBookmarks.get(0);

		Mockito.doNothing().when(bookmarkService).deleteBookmark(bookmark.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}
}
