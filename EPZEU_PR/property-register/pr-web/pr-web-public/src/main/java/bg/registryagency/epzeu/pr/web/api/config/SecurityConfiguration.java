package bg.registryagency.epzeu.pr.web.api.config;

import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.cache.LanguageNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.web.api.filter.LanguageFilter;
import bg.registryagency.epzeu.pr.web.common.filter.IpFilter;
import bg.registryagency.epzeu.pr.web.common.security.TokenSecurityProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@Configuration
@Import(SecurityProblemSupport.class)
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final SecurityProblemSupport securityProblemSupport;
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final LocaleResolver localeResolver;
    private final Environment env;
    private final LabelMessageSource labelMessageSource;

    private final LanguageNomenclatureCache languageCache;
    private final AppParameterCache appParameterCache;
    private final ApplicationApiProperties apiProperties;

    @Value("${springdoc.api-docs.path}")
    private String apiDocsPath;

    @Value("${springdoc.swagger-ui.path}")
    private String swaggerPath;

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
            .mvcMatchers(HttpMethod.OPTIONS, "/**")
            .mvcMatchers("/app/**/*.{js,html}")
            .mvcMatchers("/css/**/*.{css}")
            .mvcMatchers("/fonts/**")
            .mvcMatchers("/images/**")
            .mvcMatchers("/js/**/*.{js}")
            .mvcMatchers("/identity/*.{html}");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .addFilterAfter(languageFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .authenticationEntryPoint(securityProblemSupport)
            .accessDeniedHandler(securityProblemSupport)
        .and()
            .csrf()
            .disable()
            .headers()
            .frameOptions()
            .disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .mvcMatchers(HttpMethod.POST,"/**/errorHandling/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/book/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/actsByBook/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/registryOffice/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/registerTypes/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/applicationStatuses/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/applicationTypes/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/applicantCategoriesForUpcomingDeal/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Nomenclatures/place/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Reports/FeeCalculator/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Reports/ApplicationStatus/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/Reports/RegistryOfficeSearch/**").permitAll()
            .mvcMatchers(HttpMethod.GET,"/**/PropertyDeals/**").permitAll()
            .mvcMatchers("/**" + ApplicationConstants.BASE_API_PATH + "/**").authenticated()
        .and()
            .apply(securityConfigurerAdapter());

        String[] restrictedUrlPaths = apiProperties.getIpFilter().getRestrictedUrlPaths();
        String[] allowedIpAddresses = apiProperties.getIpFilter().getAllowedIpAddresses();

        if(restrictedUrlPaths != null && restrictedUrlPaths.length != 0 && allowedIpAddresses != null && allowedIpAddresses.length != 0) {
            http.addFilterBefore(new IpFilter(restrictedUrlPaths, allowedIpAddresses), CorsFilter.class);
        }
    }

    /*TODO We allow percent because of ApplicationControllerREAU which has get method which receives pathVariable with encoded string �?Р-123 = %D0%98%D0%A0-123
     check do we need to release application with this security issue*/
    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedPercent(true);
        return firewall;
    }

    private TokenConfigurer securityConfigurerAdapter() {
        return new TokenConfigurer(new TokenSecurityProvider(userService, tokenProvider), appParameterCache, labelMessageSource);
    }

    private LanguageFilter languageFilter() {
        return new LanguageFilter(languageCache, appParameterCache, (CookieLocaleResolver) localeResolver, env, labelMessageSource, apiDocsPath, swaggerPath);
    }
}
