package org.zabardast.bookmarks.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
public class ApplicationConfig {
    @Bean
    ForwardedHeaderFilter forwardedHeaderFilter() { return new ForwardedHeaderFilter(); }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
