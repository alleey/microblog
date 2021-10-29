package org.zabardast.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;

@SpringBootTest(properties = { "spring.cloud.config.enabled:false" })
class ApplicationTests {

	@MockBean
	ReactiveClientRegistrationRepository clientRegistrationRepository;

	@Test
	void contextLoads() {
	}

}
