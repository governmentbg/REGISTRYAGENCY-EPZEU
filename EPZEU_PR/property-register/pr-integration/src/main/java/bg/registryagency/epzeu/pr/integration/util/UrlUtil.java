package bg.registryagency.epzeu.pr.integration.util;

import org.springframework.util.StringUtils;

public final class UrlUtil {

    private UrlUtil(){}

    public static String ensureTrailingSlashExists(String url) {
        if(StringUtils.hasText(url) && !url.endsWith("/")) {
            url += "/";
        }

        return url;
    }
}
