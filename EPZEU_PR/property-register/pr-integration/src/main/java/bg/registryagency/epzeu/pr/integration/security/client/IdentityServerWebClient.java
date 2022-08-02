package bg.registryagency.epzeu.pr.integration.security.client;

import bg.registryagency.epzeu.pr.integration.security.AccessToken;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import com.nimbusds.jwt.JWTClaimsSet;
import reactor.core.publisher.Mono;

public interface IdentityServerWebClient {
    Mono<AccessToken> getClientAuthenticationToken(TokenScope tokenScope);

    Mono<AccessToken> getDelegationToken(TokenScope tokenScope, String token);

    Mono<JWTClaimsSet> getClaimsByReferenceToken(String token);
}
