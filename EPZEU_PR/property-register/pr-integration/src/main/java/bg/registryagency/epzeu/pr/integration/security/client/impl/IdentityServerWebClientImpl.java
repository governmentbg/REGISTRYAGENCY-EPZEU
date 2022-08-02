package bg.registryagency.epzeu.pr.integration.security.client.impl;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.conf.ConfigDefaults;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.exception.UnauthorizedException;
import bg.registryagency.epzeu.pr.integration.security.AccessToken;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import bg.registryagency.epzeu.pr.integration.security.client.IdentityServerWebClient;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Duration;
import java.util.Base64;

@Slf4j
@RequiredArgsConstructor
@Component
public class IdentityServerWebClientImpl implements IdentityServerWebClient {
    private final WebClient identityServerNativeWebClient;
    private final ApplicationIntegrationProperties appProperties;

    @Override
    public Mono<AccessToken> getClientAuthenticationToken(TokenScope tokenScope) {
        LinkedMultiValueMap requestBodyMap = new LinkedMultiValueMap();
        requestBodyMap.add("grant_type", TokenGrantType.CLIENT_CREDENTIALS.getValue());
        requestBodyMap.add("scope", tokenScope.getValue());
        requestBodyMap.add("client_id", appProperties.getSecurity().getJwt().getClientId());
        requestBodyMap.add("client_secret", appProperties.getSecurity().getJwt().getClientSecret());

        return identityServerNativeWebClient.post().uri("/connect/token")
            .body(BodyInserters.fromMultipartData(requestBodyMap))
            .retrieve().bodyToMono(AccessToken.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                .retryMax(ConfigDefaults.Retry.retryCount));
    }

    @Override
    public Mono<AccessToken> getDelegationToken(TokenScope tokenScope, String token) {
        LinkedMultiValueMap requestBodyMap = new LinkedMultiValueMap();
        requestBodyMap.add("grant_type", TokenGrantType.DELEGATION.getValue());
        requestBodyMap.add("scope", tokenScope.getValue());
        requestBodyMap.add("client_id", appProperties.getSecurity().getJwt().getClientId());
        requestBodyMap.add("client_secret", appProperties.getSecurity().getJwt().getClientSecret());
        requestBodyMap.add("token", token);

        return identityServerNativeWebClient.post().uri("/connect/token")
            .body(BodyInserters.fromMultipartData(requestBodyMap))
            .retrieve().bodyToMono(AccessToken.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                .retryMax(ConfigDefaults.Retry.retryCount));
    }

    @Override
    public Mono<JWTClaimsSet> getClaimsByReferenceToken(String token) {
        String basicAuthCred = appProperties.getSecurity().getIs().getUsername() + ":" + appProperties.getSecurity().getIs().getSecret();

        return identityServerNativeWebClient.post().uri("/connect/introspect")
            .header("Authorization", "Basic " + Base64.getEncoder().encodeToString(basicAuthCred.getBytes(StandardCharsets.UTF_8)))
            .body(BodyInserters.fromMultipartData("token", token))
            .exchange().flatMap(response ->
                response.bodyToMono(String.class).flatMap(claimsSetString -> {
                    try {
                        return Mono.just(JWTClaimsSet.parse(claimsSetString));
                    } catch (ParseException e) {
                        log.error(e.getMessage(), e);
                        return Mono.error(new UnauthorizedException(e.getMessage(), e));
                    }
                })
            )
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                .retryMax(ConfigDefaults.Retry.retryCount));
    }
}
