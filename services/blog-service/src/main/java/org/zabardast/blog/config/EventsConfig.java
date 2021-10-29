package org.zabardast.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zabardast.common.services.DefaultServiceSecurityContextProvider;
import org.zabardast.common.services.ServiceSecurityContextProvider;

@Configuration
public class EventsConfig {
    @Bean
    ServiceSecurityContextProvider serviceSecurityContextProvider() {
        return new DefaultServiceSecurityContextProvider();
    }
}
