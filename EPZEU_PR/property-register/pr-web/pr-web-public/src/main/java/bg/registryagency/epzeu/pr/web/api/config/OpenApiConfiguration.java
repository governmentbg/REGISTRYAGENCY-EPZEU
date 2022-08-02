package bg.registryagency.epzeu.pr.web.api.config;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.util.UrlUtil;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
@RequiredArgsConstructor
public class OpenApiConfiguration {
    public static final String SECURITY_SCHEME_NAME = "oauth2";
    private final ApplicationIntegrationProperties integrationProperties;

    @Value("${info.project.version}") String appVersion;
    @Value("${spring.application.name}") String appName;

    @Bean
    public OpenAPI customOpenAPI() {
        String scope = integrationProperties.getSecurity().getJwt().getScope();

        return new OpenAPI()
            .components(new Components()
                .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme().in(SecurityScheme.In.HEADER)
                    .type(SecurityScheme.Type.OAUTH2).flows(new OAuthFlows()
                        .implicit(new OAuthFlow()
                            .authorizationUrl(UrlUtil.ensureTrailingSlashExists(integrationProperties.getOidc().getAutority()) + "connect/authorize")
                            .scopes(new Scopes().addString(scope, scope))))))
            .info(new Info().title(appName).version(appVersion));
    }
}
