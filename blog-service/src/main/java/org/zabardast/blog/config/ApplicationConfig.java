package org.zabardast.blog.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.zabardast.common.feign.PropagatingCredentialsFeignRequestInterceptor;

@Configuration
public class ApplicationConfig {
    @Bean
    public PropagatingCredentialsFeignRequestInterceptor requestInterceptor() {
        return new PropagatingCredentialsFeignRequestInterceptor();
    }

    @Bean
    ForwardedHeaderFilter forwardedHeaderFilter() { return new ForwardedHeaderFilter(); }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
