package org.zabardast.common.auth;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class KeycloackGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private static final String DEFAULT_AUTHORITY_PREFIX = "ROLE_";
    private String authorityPrefix = DEFAULT_AUTHORITY_PREFIX;

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (String authority : getAuthorities(jwt)) {
            grantedAuthorities.add(new SimpleGrantedAuthority(this.authorityPrefix + authority));
        }
        return grantedAuthorities;
    }

    private Collection<String> getAuthorities(Jwt jwt) {
        Object authorities = jwt.getClaim("realm_access");
        if (authorities instanceof JSONObject) {
            JSONObject realm_access = (JSONObject) authorities;
            JSONArray roles = (JSONArray) realm_access.get("roles");
            return roles.stream()
                    .map(m -> m.toString().toUpperCase())
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}
