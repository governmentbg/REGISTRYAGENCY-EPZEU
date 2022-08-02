package bg.registryagency.epzeu.pr.integration.security;

import bg.registryagency.epzeu.pr.integration.cache.TokenCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.exception.UnauthorizedException;
import bg.registryagency.epzeu.pr.integration.security.client.IdentityServerWebClient;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.time.Duration;

@Slf4j
@Service
public class TokenProvider {
    private final ApplicationIntegrationProperties applicationProperties;
    private final IdentityServerWebClient isWebClient;
    private final TokenCache tokenCache;

    private final ConfigurableJWTProcessor jwtProcessor;

    public TokenProvider(ApplicationIntegrationProperties applicationProperties,
                         IdentityServerWebClient isWebClient, TokenCache tokenCache, ConfigurableJWTProcessor configurableJWTProcessor) {
        this.applicationProperties = applicationProperties;
        this.isWebClient = isWebClient;
        this.tokenCache = tokenCache;
        this.jwtProcessor = configurableJWTProcessor;
    }

    public AccessToken provideClientAuthenticationToken(TokenScope tokenScope) {
        //Cache key is system's client id + token scope(token can be returned for different reasons with different scopes)
        String cacheKey = applicationProperties.getSecurity().getJwt().getClientId() + "." + tokenScope;

        AccessToken token = tokenCache.get(cacheKey);

        if(token != null && StringUtils.hasText(token.getToken())) {
            return token;
        } else {
            AccessToken accessToken = isWebClient.getClientAuthenticationToken(tokenScope)
                .block(Duration.ofSeconds(3));//Block until response received, set timeout to 3 seconds

            processToken(accessToken.getToken());

            if(log.isDebugEnabled()) {
                log.debug("Client auth token received for client: " + applicationProperties.getSecurity().getJwt().getClientId());
            }
            tokenCache.put(cacheKey, accessToken);

            return tokenCache.get(cacheKey);
        }
    }

    public AccessToken provideDelegationToken(String userSession, TokenScope tokenScope, String token) {
        //Cache key is user's session id + token scope(token can be returned for different reasons with different scopes for different modules)
        String cacheKey = userSession + "." + tokenScope;

        AccessToken delegationToken = tokenCache.get(cacheKey);

        if(delegationToken != null && StringUtils.hasText(delegationToken.getToken())) {
            return delegationToken;
        } else {
            AccessToken accessToken = isWebClient.getDelegationToken(tokenScope, token)
                .block(Duration.ofSeconds(3));//Block until response received, set timeout to 3 seconds

            processToken(accessToken.getToken());

            if(log.isDebugEnabled()) {
                log.debug("Delegation token received for user-session-id: " + userSession);
            }

            tokenCache.put(cacheKey, accessToken);

            return tokenCache.get(cacheKey);
        }
    }

    public AccessToken provideToken(TokenScope tokenScope) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccessToken accessToken;

        //If there is loggedClient then provide delegation token otherwise Client authentication token
        if(authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            accessToken = provideClientAuthenticationToken(tokenScope);
        } else {
            String jwt = (String) authentication.getCredentials();
            accessToken = provideDelegationToken(((AuthenticationToken)authentication).getLoginSessionId(), tokenScope, jwt);
        }

        return accessToken;
    }

    public AccessToken provideToken(TokenScope tokenScope, TokenGrantType tokenGrantType) {
        if(TokenGrantType.CLIENT_CREDENTIALS == tokenGrantType) {
            return provideClientAuthenticationToken(tokenScope);
        } else if(TokenGrantType.DELEGATION == tokenGrantType) {
            return provideToken(tokenScope);
        } else {
            throw new IllegalArgumentException("Token grant type: " + tokenGrantType + ", is not supported!");
        }
    }

    /**
     * Parses and validates token.
     * @param accessToken The JWT, compact-encoded to a URL-safe string. Must not be null.
     * @return The JWT claims set on success
     */
    public JWTClaimsSet processToken(String accessToken) {
        if(!StringUtils.hasText(accessToken)) {
            throw new UnauthorizedException("Missing token");
        }

        try {
            JWTClaimsSet jwtClaimsSet;

            //Only JWT has dot, reference token do not have dot
            if(!accessToken.contains(".")) {
                jwtClaimsSet = isWebClient.getClaimsByReferenceToken(accessToken).block();
                if(!((Boolean)jwtClaimsSet.getClaim("active"))) {
                    throw new UnauthorizedException("Reference token is expired");
                }
            } else {
                SecurityContext ctx = null; // optional context parameter, not required here
                jwtClaimsSet = jwtProcessor.process(accessToken, ctx);
            }

            if(jwtClaimsSet == null) {
                throw new UnauthorizedException("Missing token's claim set");
            }

            return jwtClaimsSet;
        } catch (ParseException | JOSEException | BadJOSEException e) {
            if(log.isDebugEnabled()) {
                log.debug(e.getMessage(), e);
            }

            throw new UnauthorizedException(e.getMessage(), e);
        }
    }

    public void validateScope(JWTClaimsSet jwtClaimsSet) {
        //Currently the scope of the whole API is the same as client id of the API
        String apiScope = applicationProperties.getSecurity().getJwt().getScope();

        Object scope = jwtClaimsSet.getClaim("scope");
        if(scope instanceof JSONArray) {
            JSONArray scopes = (JSONArray) scope;
            if(scopes == null || !scopes.contains(apiScope)) {
                throw new UnauthorizedException("Client do not have needed scope to use API");
            }
        } else {
            if(!apiScope.equals(scope)) {
                throw new UnauthorizedException("Client do not have needed scope to use API");
            }
        }
    }
}
