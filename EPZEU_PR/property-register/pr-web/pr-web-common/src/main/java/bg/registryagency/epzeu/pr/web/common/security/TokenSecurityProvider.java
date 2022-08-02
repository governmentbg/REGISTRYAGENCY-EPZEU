package bg.registryagency.epzeu.pr.web.common.security;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.integration.api.security.UserDetails;
import bg.registryagency.epzeu.pr.integration.security.AuthenticationToken;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import org.jboss.logging.MDC;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class TokenSecurityProvider {
    private static final String AUTHORITIES_KEY = "role";

    private final UserService userService;
    private final TokenProvider tokenProvider;

    public Authentication getAuthentication(String token, String remoteIpAddress, String sessionId) throws ParseException {
        JWTClaimsSet jwtClaimsSet = tokenProvider.processToken(token);
        tokenProvider.validateScope(jwtClaimsSet);

        Collection<GrantedAuthority> authorities;
        try {
            Object authoritiesClaim = jwtClaimsSet.getClaim(AUTHORITIES_KEY);
            String[] authoritiesClaims = null;
            if(authoritiesClaim instanceof JSONArray) {
                authoritiesClaims = jwtClaimsSet.getStringArrayClaim(AUTHORITIES_KEY);

                authorities = Arrays.stream(authoritiesClaims)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
            } else {
                authorities = new ArrayList<>(1);
                String stringClaim = jwtClaimsSet.getStringClaim(AUTHORITIES_KEY);
                if(StringUtils.hasText(stringClaim)) {
                    authorities.add(new SimpleGrantedAuthority(stringClaim));
                }
            }

            if(authoritiesClaims != null) {
                authorities = Arrays.stream(authoritiesClaims)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
            }
        } catch (ParseException e) {
            if(log.isDebugEnabled()) {
                log.debug(e.getMessage(), e);
            }

            throw new AccessDeniedException(e.getMessage(), e);
        }

        String cin = jwtClaimsSet.getStringClaim("cin");
        User user;
        String loginSessionId = null;
        //If token is for real end user then get user data from token
        if(cin != null) {
            loginSessionId = jwtClaimsSet.getStringClaim("login_session_id");

            MDC.put("userId", jwtClaimsSet.getClaim("sub"));

            user = new User(Integer.parseInt(cin), jwtClaimsSet.getStringClaim("name"), false);
        } else {
            //If token is client authentication that means token is get for system user from another system then set authenticated user system user for Portal Property Register
            user = User.getSystemUser();
        }

        user = userService.ensureUser(user);

        String specialAccessType = jwtClaimsSet.getStringClaim("access_type");
        Integer specialAccessTypeId = null;

        if(StringUtils.hasText(specialAccessType)) {
            specialAccessTypeId = Integer.parseInt(specialAccessType);
        }

        AuthenticationToken authenticationToken = new AuthenticationToken(user, token, loginSessionId, specialAccessTypeId, authorities);
        authenticationToken.setDetails(new UserDetails(remoteIpAddress, sessionId));

        return authenticationToken;
    }
}
