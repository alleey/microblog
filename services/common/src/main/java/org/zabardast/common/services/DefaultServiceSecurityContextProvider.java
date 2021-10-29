package org.zabardast.common.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class DefaultServiceSecurityContextProvider implements ServiceSecurityContextProvider {
    @Override
    public String getPrincipalName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
}
