package bg.registryagency.epzeu.pr.integration.security;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class AuthenticationToken extends AbstractAuthenticationToken {
    private final Object principal;
    private final Object credentials;
    private final String loginSessionId;
    private final Integer specialAccessTypeId;

    public AuthenticationToken(Object principal, Object credentials, String loginSessionId, Integer specialAccessTypeId,
                               Collection<? extends GrantedAuthority> authorities) {
        super(authorities);

        this.principal = principal;
        this.credentials = credentials;
        this.loginSessionId = loginSessionId;
        this.specialAccessTypeId = specialAccessTypeId;

        super.setAuthenticated(true); // must use super, as we override
    }
}
