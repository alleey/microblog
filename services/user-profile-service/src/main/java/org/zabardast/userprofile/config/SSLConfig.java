package org.zabardast.userprofile.config;

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

//@Slf4j
//@Configuration
//public class CustomFeignConfig {
//    @Bean
//    public Client feignClient(@Value("${server.ssl.trust-store}") Resource trustStoreResource,
//                              @Value("${server.ssl.trust-store-password}") String trustStorePassword) throws Exception {
//        try {
//            log.info("Using custom feign configuration");
//            return new Client.Default(
//                    sslSocketFactory(trustStoreResource.getInputStream(), trustStorePassword),
//                    null);
//        } catch (Exception e) {
//            throw new Exception("Error in initializing feign client", e);
//        }
//    }
//
//    private static SSLSocketFactory sslSocketFactory(InputStream trustStoreStream, String trustStorePassword)
//            throws NoSuchAlgorithmException, KeyStoreException, CertificateException, IOException, KeyManagementException {
//        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
//        TrustManagerFactory tmf = createTrustManager(trustStoreStream, trustStorePassword);
//        sslContext.init(new KeyManager[]{}, tmf.getTrustManagers(), null);
//        return sslContext.getSocketFactory();
//    }
//
//    private static TrustManagerFactory createTrustManager(InputStream trustStoreStream, String trustStorePassword)
//            throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException {
//        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
//        trustStore.load(trustStoreStream, trustStorePassword.toCharArray());
//        TrustManagerFactory tmf = TrustManagerFactory
//                .getInstance(TrustManagerFactory.getDefaultAlgorithm());
//        tmf.init(trustStore);
//        return tmf;
//    }
//}

@Slf4j
@Configuration
@Profile("!test")
public class SSLConfig {

    @Value("${server.ssl.trust-store}") Resource trustStore;
    @Value("${server.ssl.trust-store-password}") String trustStorePassword;

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