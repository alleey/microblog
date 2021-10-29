package org.zabardast.gateway.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;

@Slf4j
@Configuration
@Profile("!test")
public class SSLConfig {

    @Value("${server.ssl.trust-store:classpath:keystore/server.jks}") Resource trustStore;
    @Value("${server.ssl.trust-store-password:secret}") String trustStorePassword;

    @PostConstruct
    private void configureSSL() throws IOException {
        try {
            File tempFile = File.createTempFile("trust-store", ".jks");
            Files.copy(trustStore.getInputStream(), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            log.info("Truststore copied to temporary file " + tempFile.getAbsolutePath());

            System.setProperty("javax.net.ssl.trustStore", tempFile.getAbsolutePath());
            System.setProperty("javax.net.ssl.trustStorePassword", trustStorePassword);
        } catch (IOException e) {
            log.error(e.toString());
            throw e;
        }
    }
}