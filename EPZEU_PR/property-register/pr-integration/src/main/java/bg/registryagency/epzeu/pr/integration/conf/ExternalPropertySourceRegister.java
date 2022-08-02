package bg.registryagency.epzeu.pr.integration.conf;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.security.AccessToken;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.boot.env.PropertiesPropertySourceLoader;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExternalPropertySourceRegister implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

    //TODO think about adding of WebClientFactory which will be used in spring Configuration when creation of Beans and here

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        ConfigurableEnvironment environment = event.getEnvironment();

        if (environment.getActiveProfiles().length > 0) {
            PropertySource<?> propertySource = getPropertySource(environment.getActiveProfiles()[0]);
            //Add App Parameters Property source in the last position in Property Sources to get possibility for overriding of these properties in properties files in config
            environment.getPropertySources().addLast(getAppParametersPropertySource(propertySource));
        }
    }

    private PropertySource<?> getPropertySource(String activeProfile) {
        //Property Register Portal is designed to have only one active spring profile
        List<PropertySource<?>> propertySources = null;
        try {
            Resource path = null;
            if(activeProfile.equals(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)) {
                path = new ClassPathResource("/config/application-integration-" + activeProfile + ".properties");
            } else {
                path = new UrlResource("file:./config/application-integration-" + activeProfile + ".properties");
            }

            propertySources = new PropertiesPropertySourceLoader().load("application-integration", path);
        } catch (IOException e) {
            log.error(e.getMessage(), e);

            throw new UncheckedIOException("Cannot load 'application-integration-" + activeProfile + ".properties file. It does not exist!", e);
        }

        //Only one config file with corresponding name is possible to have in classpath
        return propertySources.get(0);
    }

    private MapPropertySource getAppParametersPropertySource(PropertySource<?> propertySource) {
        WebClient parameterWebClient = WebClient.builder().baseUrl(propertySource.getProperty("application.integration.epzeu.api-base-url").toString()).build();

        Map<String, Object> appParametersPropertySource = new LinkedHashMap<>();

        parameterWebClient.get()
                .uri("/AppParameters")
                .header("Authorization", "Bearer " + getAccessToken(propertySource).getToken())
                .accept(MediaType.APPLICATION_JSON)
                .acceptCharset(StandardCharsets.UTF_8)
                .retrieve().bodyToFlux(AppParameter.class)
                .doOnNext(appParameter -> appParametersPropertySource.put(appParameter.getCode(), appParameter.getValueString()))
                .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                    .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                    .retryMax(ConfigDefaults.Retry.retryCount))
                .blockLast();

        return new MapPropertySource("appParameters", appParametersPropertySource);
    }

    private AccessToken getAccessToken(PropertySource<?> propertySource) {
        LinkedMultiValueMap requestBodyMap = new LinkedMultiValueMap();
        requestBodyMap.add("grant_type", TokenGrantType.CLIENT_CREDENTIALS.getValue());
        requestBodyMap.add("scope", TokenScope.EPZEU_API.getValue());
        requestBodyMap.add("client_id", propertySource.getProperty("application.integration.security.jwt.client-id"));
        requestBodyMap.add("client_secret", propertySource.getProperty("application.integration.security.jwt.client-secret"));

        WebClient tokenWebClient = WebClient.builder().baseUrl(propertySource.getProperty("application.integration.security.is.base-url").toString()).build();

        return (AccessToken) tokenWebClient.post()
            .uri("/connect/token")
            .body(BodyInserters.fromMultipartData(requestBodyMap))
            .retrieve()
            .bodyToMono(AccessToken.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                .retryMax(ConfigDefaults.Retry.retryCount))
            .block();
    }
}
