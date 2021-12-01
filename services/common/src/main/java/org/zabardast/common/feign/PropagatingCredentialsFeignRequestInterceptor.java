package org.zabardast.common.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;

@Slf4j
public class PropagatingCredentialsFeignRequestInterceptor implements RequestInterceptor {

    public static final String AUTHORIZATION_TOKEN_NAME = "Bearer";

    @Override
    public void apply(RequestTemplate template) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return;
        }

        if (!(authentication.getCredentials() instanceof AbstractOAuth2Token)) {
            return;
        }

        AbstractOAuth2Token token = (AbstractOAuth2Token) authentication.getCredentials();
        String tokenValue = String.format("%s %s", AUTHORIZATION_TOKEN_NAME, token.getTokenValue());
        log.debug("Propagating -> " + tokenValue);
        template.header(HttpHeaders.AUTHORIZATION, Collections.singleton(tokenValue));
    }
}
