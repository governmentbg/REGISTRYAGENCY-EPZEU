package bg.registryagency.epzeu.pr.integration.epzeu.service.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.service.ApplicationConfigService;
import bg.registryagency.epzeu.pr.integration.exception.ConfigurationException;
import bg.registryagency.epzeu.pr.integration.util.UrlUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationConfigServiceImpl implements ApplicationConfigService {

    private final ApplicationIntegrationProperties applicationProperties;
    private final AppParameterCache appParameterCache;
    private final Environment env;
    private final ObjectMapper objectMapper;

    @Override
    public String getApplicationConfig(String languageCode) {
        if(languageCode == null) {
            languageCode = ApplicationConstants.LANGUAGE_DEFAULT;
        }

        AppParameter maxRequestLengthInKB = appParameterCache.get(AppParameterKey.GL_DOCUMENT_MAX_FILE_SIZE);
        AppParameter acceptedFileExt = appParameterCache.get(AppParameterKey.GL_DOCUMENT_ALLOWED_FORMATS);
        String epzeuPortalBaseUrl = applicationProperties.getEpzeu().getPortalBaseUrl();

        return
            new StringBuilder("var applicationConfig = {")
                .append("baseUrlName:'" + getBaseApiUrl() + "',")
                .append("allowTestSign:" + (appParameterCache.get(AppParameterKey.EP_SIGN_ALLOW_TEST_SIGN).getValueInt() == 1) + ",")//convert int to boolean and set it to allowTestSign
                .append("maxRequestLengthInKB:'" + maxRequestLengthInKB.getValueInt() + "',")
                .append("acceptedFileExt:'" + prepareAcceptedFiles(acceptedFileExt.getValueString()) + "',")
                .append("epzeuApiRoot:'" + epzeuPortalBaseUrl + "/Api/',")
                .append("epzeuPublicUIUrl:'" + epzeuPortalBaseUrl + "',")
                .append("clientLanguage:'" + languageCode + "',")
                .append("paths:'',")
                .append("appSaveIntervalInMs:'" + appParameterCache.get(AppParameterKey.GL_APPLICATION_DRAFTS_AUTO_SAVE_INTERVAL).getValueInterval().getTimeInMillis(new Date()) + "',")
                .append("userInactivityTimeout:" + appParameterCache.get(AppParameterKey.EP_USR_SESSION_INACTIVITY_INTERVAL).getValueInterval().getTimeInMillis(new Date()) + ",")
                .append("commonCookieDomain:'" + appParameterCache.get(AppParameterKey.GL_COMMON_COOKIE_DOMAIN).getValueString() + "'")
                .append("}; var oidcUserManagerConfig={")
                .append("authority:'" + this.applicationProperties.getOidc().getAutority() + "',")
                .append("client_id:'" + this.applicationProperties.getOidc().getClientId() + "',")
                .append("redirect_uri:'" + this.applicationProperties.getOidc().getRedirectUri() + "',")
                .append("response_type:'" + this.applicationProperties.getOidc().getResponseType() + "',")
                .append("scope:'" + this.applicationProperties.getOidc().getScope() + "',")
                .append("post_logout_redirect_uri:'" + this.applicationProperties.getOidc().getPostLogoutRedirectUri() + "',")
                .append("silent_redirect_uri:'" + this.applicationProperties.getOidc().getSilentRedirectUri() + "',")
                .append("automaticSilentRenew:'" + true + "',")
                .append("ui_locales:'" + languageCode + "'")
                .append("};").toString();
    }

    @Override
    public String getBaseOidcUserManagerConfig() {
        return new StringBuilder("let oidcUserManagerConfig={")
            .append("authority:'" + this.applicationProperties.getOidc().getAutority() + "',")
            .append("client_id:'" + this.applicationProperties.getOidc().getClientId() + "'}")
            .toString();
    }

    @Override
    public String getBaseApiUrl() {
        String[] activeProfiles = env.getActiveProfiles();
        String baseUrlName;

        //At the moment the system supports only one active profile.
        //If active profiles are more (or less) there is some misconfiguration and throws an exception.
        if (activeProfiles.length != 1) {
            throw new ConfigurationException("Profiles misconfiguration! There are more than one active profiles:" + Arrays.toString(activeProfiles));
        }
        //Get the active profile
        String activeProfile = activeProfiles[0];
        if (activeProfile.equals(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)) {
            baseUrlName = this.applicationProperties.getPr().getPortal().getWebapi().getBaseUrl();
        } else {
            baseUrlName = appParameterCache.get(AppParameterKey.PR_PUBLIC_PORTAL_BASE_URL).getValueString();
        }

        return UrlUtil.ensureTrailingSlashExists(baseUrlName);
    }

    @Override
    public String prepareAcceptedFiles(String valueString) {
        ArrayNode allowedExtensionsArrayNode;
        try {
            allowedExtensionsArrayNode = (ArrayNode)objectMapper.readTree(valueString);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
            //If there is some misconfiguration in application parameter and parameter cannot be parsed them return default allowed extensions
            return ".pdf, .txt";
        }

        StringBuilder acceptedDocumentFormatsSB = new StringBuilder();

        Iterator<JsonNode> allowedExtensionsIterator = allowedExtensionsArrayNode.iterator();

        while(allowedExtensionsIterator.hasNext()) {
            String ext = allowedExtensionsIterator.next().get("extension").asText();
            acceptedDocumentFormatsSB.append(".");
            acceptedDocumentFormatsSB.append(ext);

            if(allowedExtensionsIterator.hasNext()) {
                acceptedDocumentFormatsSB.append(", ");
            }
        }

        return acceptedDocumentFormatsSB.toString();
    }
}
