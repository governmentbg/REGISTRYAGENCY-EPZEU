package bg.registryagency.epzeu.pr.web.api.internal.config;

import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.web.common.filter.IpFilter;
import bg.registryagency.epzeu.pr.web.common.security.TokenSecurityProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.filter.CorsFilter;
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

    private final AppParameterCache appParameterCache;
    private final ApplicationApiProperties apiProperties;

    private final LabelMessageSource labelMessageSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
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
            .mvcMatchers("/**" + ApplicationConstants.BASE_API_PATH + "/**").authenticated()
        .and()
            .apply(securityConfigurerAdapter());

        String[] restrictedUrlPaths = apiProperties.getIpFilter().getRestrictedUrlPaths();
        String[] allowedIpAddresses = apiProperties.getIpFilter().getAllowedIpAddresses();

        if(restrictedUrlPaths != null && restrictedUrlPaths.length != 0 && allowedIpAddresses != null && allowedIpAddresses.length != 0) {
            http.addFilterBefore(new IpFilter(restrictedUrlPaths, allowedIpAddresses), CorsFilter.class);
        }
    }

    /*TODO We allow percent because of ApplicationControllerREAU which has get method which receives pathVariable with encoded string ИР-123 = %D0%98%D0%A0-123
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
}
