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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zabardast.bookmarks.MockBookmarkData;
import org.zabardast.bookmarks.dto.BookmarkRepresentation;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.services.BookmarkService;
import org.zabardast.bookmarks.services.exceptions.BookmarkAlreadyExistsException;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.Operator;

@SpringBootTest()
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarksController_UserTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private BookmarkService bookmarkService;

	@Autowired
	private ModelMapper modelMapper;

	private MockBookmarkData blogData = new MockBookmarkData();

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void getAllBookmarks() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllBookmarks.subList(0,pageable.getPageSize()), pageable, blogData.AllBookmarks.size());
		Mockito.when(bookmarkService.getAllBookmarks(MockBookmarkData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaTypes.HAL_JSON_VALUE))
				.andExpect(jsonPath("$._embedded.bookmarks", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void getAllBookmarksCustomPaging() throws Exception {

		Pageable pageable = PageRequest.of(0, 1);
		PageImpl page = new PageImpl(Arrays.asList(blogData.AllBookmarks.get(0)), pageable, blogData.AllBookmarks.size());
		Mockito.when(bookmarkService.getAllBookmarks(MockBookmarkData.UserIdGuest, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks?page=0&size=1")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.bookmarks", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void searchBookmarks() throws Exception {

		Pageable pageable = PageRequest.of(0, 20);
		PageImpl page = new PageImpl(blogData.AllBookmarks.subList(0,pageable.getPageSize()), pageable, blogData.AllBookmarks.size());
		Filter critera = Filter.builder().conditions(
			Arrays.asList(Condition.builder().attribute("caption").operator(Operator.EQ).value("something").build())
		).build();

		Mockito.when(bookmarkService.getAllFiltered(MockBookmarkData.UserIdGuest, critera, pageable)).then(r -> page);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks/search?q={json}", MockBookmarkData.objectToJson(critera))
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.bookmarks", hasSize(page.getNumberOfElements())))
				.andExpect(jsonPath("$.page.size", is(page.getSize())))
				.andExpect(jsonPath("$.page.totalPages", is(page.getTotalPages())))
				.andExpect(jsonPath("$.page.totalElements", is((int)page.getTotalElements())))
				.andExpect(jsonPath("$.page.number", is(page.getNumber())));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void getBookmarkById() throws Exception {

		Mockito.when(bookmarkService.getBookmark(MockBookmarkData.UserIdGuest,5L)).then(r -> blogData.AllBookmarks.get(5));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks/5")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id", is(5)))
				.andExpect(jsonPath("$.caption", equalTo(blogData.AllBookmarks.get(5).getCaption())))
				.andExpect(jsonPath("$._links.self.href", endsWith("/api/v1/bookmarks/5")));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void getNotExistentBookmark() throws Exception {

		Mockito.when(bookmarkService.getBookmark(MockBookmarkData.UserIdGuest, 100L)).thenThrow(new BookmarkNotFoundException(100L));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/bookmarks/100")
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCanCreateBookmark() throws Exception {

		Bookmark newBookmark = MockBookmarkData.createBookmark(100, "Test", "Test", MockBookmarkData.UserIdGuest);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(newBookmark, BookmarkRepresentation.class);

		Mockito.when(bookmarkService.newBookmark(MockBookmarkData.UserIdGuest, bookmarkRepresentation)).then(r -> newBookmark);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CREATED));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userBookmarkRequiresUniqueSlug() throws Exception {

		Bookmark newBookmark = blogData.AllBookmarks.get(1);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(newBookmark, BookmarkRepresentation.class);

		Mockito.when(bookmarkService.newBookmark(MockBookmarkData.UserIdGuest, bookmarkRepresentation))
				.thenThrow(new BookmarkAlreadyExistsException(blogData.AllBookmarks.get(1)));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/bookmarks")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_CONFLICT));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCanUpdateOwnedBookmark() throws Exception {

		Bookmark bookmark = blogData.AlLUserBookmarks.get(0);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(bookmark, BookmarkRepresentation.class);

		Mockito.when(bookmarkService.getBookmark(bookmark.getId())).then(r -> bookmark);
		Mockito.when(bookmarkService.updateBookmark(bookmark.getId(), bookmarkRepresentation)).then(r -> bookmark);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(
					String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_OK));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCannotUpdateNonExistingBookmark() throws Exception {

		Bookmark bookmark = blogData.AlLUserBookmarks.get(0);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(bookmark, BookmarkRepresentation.class);

		Mockito.when(bookmarkService.updateBookmark(1000L, bookmarkRepresentation))
				.thenThrow(new BookmarkNotFoundException(bookmark.getId()));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/bookmarks/1000")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCannotUpdateOthersBookmark() throws Exception {

		Bookmark bookmark = blogData.AllAdminBookmarks.get(0);
		BookmarkRepresentation bookmarkRepresentation = modelMapper.map(bookmark, BookmarkRepresentation.class);

		Mockito.when(bookmarkService.getBookmark(bookmark.getId())).then(r -> bookmark);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(
					String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(MockBookmarkData.objectToJson(bookmarkRepresentation));

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCanDeleteOwnedBookmark() throws Exception {

		Bookmark bookmark = blogData.AlLUserBookmarks.get(0);
		Mockito.when(bookmarkService.getBookmark(bookmark.getId())).then(r -> bookmark);
		Mockito.doNothing().when(bookmarkService).deleteBookmark(bookmark.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(
					String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NO_CONTENT))
				.andExpect(jsonPath("$").doesNotExist());
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCannotDeleteNonExistingBookmark() throws Exception {

		Bookmark bookmark = blogData.AlLUserBookmarks.get(0);

		Mockito.when(bookmarkService.getBookmark(1000L))
				.thenThrow(new BookmarkNotFoundException(bookmark.getId()));
		Mockito.doNothing().when(bookmarkService).deleteBookmark(bookmark.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(
					"/api/v1/bookmarks/1000")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_NOT_FOUND));
	}

	@Test
	@WithMockUser(username = MockBookmarkData.UserIdGuest, roles = "USER")
	void userCannotDeleteOthersBookmark() throws Exception {

		Bookmark bookmark = blogData.AllAdminBookmarks.get(0);
		
		Mockito.when(bookmarkService.getBookmark(bookmark.getId())).then(r -> bookmark);
		Mockito.doNothing().when(bookmarkService).deleteBookmark(bookmark.getId());
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete(
					String.format("/api/v1/bookmarks/%d", bookmark.getId()))
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder)
				.andExpect(status().is(HttpStatus.SC_FORBIDDEN));
	}
}
