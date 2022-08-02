package bg.registryagency.epzeu.pr.web.api.i18n;

import bg.registryagency.epzeu.pr.integration.cache.CacheManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

public class LanguageInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private CacheManager cacheManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            Locale locale = LocaleContextHolder.getLocale();

            cacheManager.initEternalLabelsCacheForLanguage(locale.getLanguage());
        }

        return true;
    }
}
