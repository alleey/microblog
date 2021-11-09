package org.zabardast.resources.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
@EnableScheduling
public class ApplicationConfig {
    @Bean
    ForwardedHeaderFilter forwardedHeaderFilter() { return new ForwardedHeaderFilter(); }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
