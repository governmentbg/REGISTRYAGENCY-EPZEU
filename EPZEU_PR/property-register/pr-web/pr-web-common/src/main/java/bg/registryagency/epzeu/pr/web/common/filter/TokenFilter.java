package bg.registryagency.epzeu.pr.web.common.filter;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.web.common.security.TokenSecurityProvider;
import bg.registryagency.epzeu.pr.web.common.utils.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

/**
 * Filters incoming requests and installs a Spring Security principal if a header corresponding to a valid token.
 */
@Slf4j
//TODO Rename this token filter and take a look on similar spring security token filete called BearerTokenAuthenticationFilter
public class TokenFilter extends GenericFilterBean {
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenSecurityProvider securityProvider;
    private final AppParameterCache appParameterCache;
    private final LabelMessageSource labelMessageSource;

    public TokenFilter(TokenSecurityProvider securityProvider, AppParameterCache appParameterCache, LabelMessageSource labelMessageSource) {
        this.securityProvider = securityProvider;
        this.appParameterCache = appParameterCache;
        this.labelMessageSource = labelMessageSource;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
        throws IOException, ServletException {

        String requestURI = ((HttpServletRequest) servletRequest).getRequestURI();

        if(log.isTraceEnabled()) {
            log.trace("Checking Token for request: " + requestURI);
        }

        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        try {
            String token = resolveToken(httpServletRequest);
            String sessionId = resolveEpzeuSessionId(httpServletRequest, httpServletResponse);

            if (StringUtils.hasText(token)) {
                try {
                    Authentication authentication = this.securityProvider.getAuthentication(token,
                        WebUtils.resolveRemoteAddress(httpServletRequest.getRemoteAddr()), sessionId);

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (Exception e) {
                    if(log.isDebugEnabled()) {
                        log.debug(e.getMessage() != null ? e.getMessage() : "Error occurred during authentication", e);
                    }

                    httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "Unauthorized");
                    httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
                if (log.isTraceEnabled()) {
                    log.trace("Token is valid!");
                }
            } else {
                if (log.isDebugEnabled()) {
                    log.debug("There is no Token in request.");
                }
            }
        } catch (Exception e) {
            if(log.isDebugEnabled()) {
                log.debug(e.getMessage(), e);
            }

            httpServletResponse.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                labelMessageSource.getMessageOrDefault("GL_ERROR_L", "Възникна грешка!"));
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        String token = request.getParameter("key");
        if(StringUtils.hasText(token)) {
            return token;
        }

        return null;
    }

    private String resolveEpzeuSessionId(HttpServletRequest request, HttpServletResponse response) {

        Optional<Cookie> epzeuSessionIdCookie = Optional.empty();

        if(request.getCookies() != null) {
            epzeuSessionIdCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(ApplicationConstants.SESSION_ID_COOKIE_NAME))
                .findFirst();
        }

        String epzeuSessionId;
        if(epzeuSessionIdCookie.isPresent()) {
            epzeuSessionId = epzeuSessionIdCookie.get().getValue();
        } else {
            epzeuSessionId = UUID.randomUUID().toString();

            Cookie cookie = new Cookie(ApplicationConstants.SESSION_ID_COOKIE_NAME, epzeuSessionId);
            cookie.setDomain(appParameterCache.get(AppParameterKey.GL_COMMON_COOKIE_DOMAIN).getValueString());
            cookie.setPath("/");
            cookie.setSecure(true);
            cookie.setHttpOnly(true);

            response.addCookie(cookie);
        }

        MDC.put("userSessionId", epzeuSessionId);

        return epzeuSessionId;
    }
}
