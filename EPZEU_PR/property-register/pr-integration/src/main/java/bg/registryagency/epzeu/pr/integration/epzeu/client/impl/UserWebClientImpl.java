package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserWebClientImpl implements UserWebClient {
    private final WebClient epzeuNativeWebClient;
    private final TokenProvider tokenProvider;
    private final AppParameterCache appParameterCache;

    @Override
    public Mono<LoginSessionDto> getLoginSessionInformation() {
        return  epzeuNativeWebClient.get().uri("/LoginSessions")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(LoginSessionDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<LoginSessionDto> getLoginSessionWithUserProfileInformation() {
        return  epzeuNativeWebClient.get().uri("/LoginSessions?loadUserProfileData=true")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(LoginSessionDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<LoginSessionDto> getLoginSessionInformationWithOrganization() {
        return  epzeuNativeWebClient.get().uri("/LoginSessions?loadOrganizationIdentifier=true")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(LoginSessionDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
