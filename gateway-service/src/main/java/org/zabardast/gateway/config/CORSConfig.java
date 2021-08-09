package org.zabardast.gateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
//
//@Configuration
//@EnableWebFlux
//public class CORSConfig implements WebFluxConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH")
//                .allowedHeaders("Accept", "Origin", "Content-Type", "Depth", "User-Agent", "If-Modified-Since,",
//                        "Cache-Control", "Authorization", "X-Req", "X-File-Size", "X-Requested-With", "X-File-Name")
//                .exposedHeaders("Accept", "Origin", "Content-Type", "Depth", "User-Agent", "If-Modified-Since,",
//                        "Cache-Control", "Authorization", "X-Req", "X-File-Size", "X-Requested-With", "X-File-Name")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//}