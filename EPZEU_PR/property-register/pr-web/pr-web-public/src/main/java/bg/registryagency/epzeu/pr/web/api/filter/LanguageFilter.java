package bg.registryagency.epzeu.pr.web.api.filter;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.cache.LanguageNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.net.URI;
import java.util.Locale;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

/**
 * Filters incoming requests and installs a Spring Security principal if a header corresponding to a valid token.
 */
@Slf4j
@RequiredArgsConstructor
public class LanguageFilter extends GenericFilterBean {

    private final LanguageNomenclatureCache languageCache;
    private final AppParameterCache appParameterCache;
    private final CookieLocaleResolver localeResolver;
    private final Environment env;
    private final LabelMessageSource labelMessageSource;

    private final String apiDocsPath;
    private final String swaggerPath;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
        throws IOException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        MDC.put("processPid", Long.toString(ManagementFactory.getRuntimeMXBean().getPid()));

        try {
            if (!request.getRequestURI().contains(apiDocsPath) && !request.getRequestURI().contains(swaggerPath) && !request.getServletPath().startsWith(ApplicationConstants.BASE_API_PATH)) {
                String urlLangCode = getPathLanguage(request);
                String cookieLangCode = getCookieValue(request);
                String headerLangCode = request.getLocale().getLanguage();

                boolean isUrlLang = false;
                boolean isCookieLang = false;
                boolean isHeaderLang = false;

                //Select language
                if (StringUtils.hasText(urlLangCode) && languageCache.get(urlLangCode) != null) {
                    isUrlLang = true;
                }
                if (!isUrlLang && StringUtils.hasText(cookieLangCode) && languageCache.get(cookieLangCode) != null) {
                    isCookieLang = true;
                }
                if (!isUrlLang && !isCookieLang && StringUtils.hasText(headerLangCode) && languageCache.get(headerLangCode) != null) {
                    isHeaderLang = true;
                }

                //Perform action
                if (isUrlLang) {
                    if (urlLangCode.equals(ApplicationConstants.LANGUAGE_DEFAULT)) {
                        addLanguageCookie(request, response, urlLangCode);
                        redirectWithoutLanguage(request, response);
                        return;
                    } else if (!StringUtils.hasText(cookieLangCode) || !urlLangCode.equals(cookieLangCode)) {
                        addLanguageCookie(request, response, urlLangCode);
                    }
                } else if (isCookieLang) {
                    //If there is no url lang and cookie lang is different than default lang(bg) then redirect to url with this lang(when lang is bg there is no lang in url)
                    if (!cookieLangCode.equals(ApplicationConstants.LANGUAGE_DEFAULT)) {
                        String servletPath = request.getServletPath();

                        redirectWithLanguage(request.getContextPath(), servletPath, response, cookieLangCode);
                        return;
                    }
                } else if (isHeaderLang) {
                    if (!headerLangCode.equals(ApplicationConstants.LANGUAGE_DEFAULT)) {
                        addLanguageCookie(request, response, headerLangCode);
                        redirectWithLanguage(request, response, headerLangCode);
                        return;
                    }
                }

                if (!isUrlLang && !isCookieLang && !isHeaderLang) {
                    addLanguageCookie(request, response, ApplicationConstants.LANGUAGE_DEFAULT);
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error(e.getMessage(), e);

            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), labelMessageSource.getMessageOrDefault("GL_ERROR_L", "Възникна грешка!"));
            return;
        }
    }

    private void addLanguageCookie(HttpServletRequest request, HttpServletResponse response, String langCode) {
        localeResolver.setCookiePath("/");
        if(!env.getActiveProfiles()[0].equals(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)) {
            AppParameter cookieDomainParameter = appParameterCache.get(AppParameterKey.GL_COMMON_COOKIE_DOMAIN);
            if(cookieDomainParameter != null) {
                localeResolver.setCookieDomain(cookieDomainParameter.getValueString());
            }
        }

        localeResolver.setCookieMaxAge((int) TimeUnit.SECONDS.convert(10 * 356, TimeUnit.DAYS));
        localeResolver.setCookieName(ApplicationConstants.LANGUAGE_COOKIE_NAME);

        localeResolver.setLocale(request, response, new Locale(isValidLanguageCode(langCode) ? langCode : ApplicationConstants.LANGUAGE_DEFAULT));
    }

    private void redirectWithoutLanguage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String encodedPath = URI.create(removeLangFromServletPath(request)).toASCIIString();
        String redirectUrl = request.getContextPath() + encodedPath;

        response.sendRedirect(redirectUrl);
    }

    private void redirectWithLanguage(HttpServletRequest request, HttpServletResponse response, String langCode) throws IOException {
        String encodedPath = URI.create(request.getServletPath()).toASCIIString();
        response.sendRedirect(request.getContextPath() + "/" + langCode + encodedPath);
    }

    private void redirectWithLanguage(String contextPath, String servletPath, HttpServletResponse response, String langCode) throws IOException {
        String encodedPath = URI.create(servletPath).toASCIIString();
        response.sendRedirect(contextPath + "/" + langCode + encodedPath);
    }

    private String removeLangFromServletPath(HttpServletRequest request) {
        return request.getServletPath().substring(ApplicationConstants.LANGUAGE_CODE_LENGTH + 1);
    }

    private String getPathLanguage(HttpServletRequest request) {
        String[] pathVariables = Stream.of(request.getServletPath().split("/")).filter(w -> !w.isEmpty()).toArray(String[]::new);
        //If the first path variable is language pass it for forwarding
        if (pathVariables.length > 0
            && isValidLanguageCode(pathVariables[0])) {
            return pathVariables[0];
        }

        return null;
    }

    private boolean isValidLanguageCode(String langCode) {
        return StringUtils.hasText(langCode) && langCode.length() == ApplicationConstants.LANGUAGE_CODE_LENGTH && langCode.matches("^[a-zA-Z]*$");
    }

    private String getCookieValue(HttpServletRequest req) {
        if (req.getCookies() != null) {
            for (Cookie cookie : req.getCookies()) {
                if (cookie.getName().equals(ApplicationConstants.LANGUAGE_COOKIE_NAME)
                    && isValidLanguageCode(cookie.getValue())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
