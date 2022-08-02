package bg.registryagency.epzeu.pr.web.api.internal.config;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.web.common.filter.TokenFilter;
import bg.registryagency.epzeu.pr.web.common.security.TokenSecurityProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class TokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenSecurityProvider securityProvider;
    private final AppParameterCache appParameterCache;
    private final LabelMessageSource labelMessageSource;

    @Override
    public void configure(HttpSecurity http) {
        TokenFilter customFilter = new TokenFilter(securityProvider, appParameterCache, labelMessageSource);
        http.addFilterAfter(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
