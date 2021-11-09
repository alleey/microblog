package org.zabardast.followers.config;

import java.util.LinkedHashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
@EnableWebMvc
@EnableHypermediaSupport(type= EnableHypermediaSupport.HypermediaType.HAL)
public class CorsConfig {

    @Bean
    @ConfigurationProperties(prefix = "server.cors")
    public Map<String, CorsConfiguration> corsConfiguration() {
        return new LinkedHashMap<>();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Autowired
            Map<String, CorsConfiguration> corsConfiguration;

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                for (Map.Entry<String, CorsConfiguration> entry : corsConfiguration.entrySet()) {
                    log.info("CORS configuration " + entry.getKey());
                    CorsRegistration reg = registry.addMapping(entry.getKey());
                    reg.combine(entry.getValue());
                }
            }
        };
    }
}
