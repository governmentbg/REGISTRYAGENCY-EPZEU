package bg.registryagency.epzeu.pr.web.api;

import bg.registryagency.epzeu.pr.integration.cache.IndexPageCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.epzeu.client.IndexPageTemplateWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.service.ApplicationConfigService;
import bg.registryagency.epzeu.pr.integration.util.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class DynamicPageProvider {

    private final ApplicationConfigService applicationConfigService;
    private final IndexPageTemplateWebClient indexPageTemplateWebClient;
    private final Environment env;
    private final ApplicationIntegrationProperties applicationProperties;
    private final IndexPageCache indexPageCache;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    public String getFrontChannelLogout() {
        return new StringBuilder("<!DOCTYPE html>")
            .append("<html>")
            .append("<body>")
                .append("<script type=\"text/javascript\" src=\"").append(contextPath).append("/js/oidc-client.js\"></script>")
                .append("<script>")
                    .append(applicationConfigService.getBaseOidcUserManagerConfig())
                    .append(";new Oidc.UserManager(oidcUserManagerConfig).removeUser();")
                .append("</script>")
            .append("</body>")
            .append("</html>")
            .toString();
    }

    public String getIndex(String language) {
        language = StringUtils.hasText(language) ? language : ApplicationConstants.LANGUAGE_DEFAULT;
        String indexPage = indexPageCache.get(language);

        if(indexPage == null) {
            String string = indexPageTemplateWebClient.getIndex(language)
                .doOnError(error -> log.error("Error during getting of index page: " + error.getMessage(), error))
                .block();

            indexPage = prepareIndex(string);

            indexPageCache.put(language, indexPage);
        }

        return addAppParametersToIndex(indexPage, language);
    }

    private String prepareIndex(String htmlContent) {
        StringBuilder index = new StringBuilder("<!DOCTYPE html>\n")
            .append("<html>\n")
            .append("<head>");

        //Extract and append metadata
        List<String> metas = extractByRegex(htmlContent, "<meta .*>");
        for (String meta : metas) {
            index.append(meta);
        }

        //Extract and append title
        List<String> titles = extractByRegex(htmlContent, "<title>.*</title>");
        if(titles != null && !titles.isEmpty()) {
            index.append(titles.get(0));
        }

        //Extract and append favicons
        List<String> favicons = extractByRegex(htmlContent, "<link .* type=\"image/vnd.microsoft.icon\">");
        favicons.stream().forEach(favicon -> index.append(favicon));

        index.append("<base href=\"").append(contextPath).append("/\">");
        index.append("<link href=\"").append(contextPath).append("/css/vendors.css\" type=\"text/css\" rel=\"stylesheet\">");
        index.append("<link href=\"").append(contextPath).append("/css/fonts.css\" type=\"text/css\" rel=\"stylesheet\">");
        index.append("<link href=\"").append(contextPath).append("/css/style.css\" type=\"text/css\" rel=\"stylesheet\">");
        index.append("<link href=\"").append(contextPath).append("/css/custom.css\" type=\"text/css\" rel=\"stylesheet\">");
        index.append("<link rel=\"shortcut icon\" href=\"").append(contextPath).append("/images/favicon.ico\" />");
        index.append("<link rel=\"icon\" type=\"image/ico\" href=\"").append(contextPath).append("/images/favicon.ico\" />");

        //Extract and append body
        index.append("</head><body>");
        String body = extractBody(htmlContent);
        index.append(body);

        //Extract scripts
        List<String> scripts = extractByRegex(htmlContent, "<script type=\"text/javascript\" .*</script>");

        //Get project version
        String projectVersion = applicationProperties.getProject().getVersion();

        String activeProfile = env.getActiveProfiles()[0];
        if (activeProfile.equals(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)) {
            String pathToDevEpzeu = applicationProperties.getEpzeu().getPortalBaseUrl();

            for (String script : scripts) {
                index.append(StringUtil.insertIntoStringAfterKey(script, pathToDevEpzeu, "src=\""));
            }

            index.append("<script type=\"text/javascript\" src=\"").append(contextPath).append("/app/vendors.").append(projectVersion).append(".chunk.js\"></script>");
        } else {
            for (String script : scripts) {
                index.append(script);
            }
        }

        //Append main and vendor bundles
        index.append("<script type=\"text/javascript\" src=\"").append(contextPath).append("/app/vendor.").append(projectVersion).append(".bundle.js\"></script>");
        index.append("<script type=\"text/javascript\" src=\"").append(contextPath).append("/app/main.").append(projectVersion).append(".bundle.js\"></script>");

        index.append("</body></html>");

        return index.toString();
    }

    private String addAppParametersToIndex(String indexPage, String language) {
        String appConfigScript = "<script type=\"text/javascript\">"
            + applicationConfigService.getApplicationConfig(language)
            + "</script>";

        return StringUtil.insertIntoStringBeforeKey(indexPage, appConfigScript, "<script");
    }

    private String extractBody(String htmlContent) {
        int pFropm = htmlContent.indexOf("<body>") + "<body>".length();
        int pTo = htmlContent.lastIndexOf("</body>");

        return htmlContent.substring(pFropm, pTo);
    }

    private List<String> extractByRegex(String htmlContent, String pattern) {
        List<String> results = new LinkedList<>();

        Pattern patt = Pattern.compile(pattern);

        Matcher matcher = patt.matcher(htmlContent);

        while (matcher.find()) {
            results.add(matcher.group(0));
        }

        return results;
    }
}
