package bg.registryagency.epzeu.pr.integration.epzeu.service;

public interface ApplicationConfigService {

    String getApplicationConfig(String language);

    String getBaseOidcUserManagerConfig();

    String getBaseApiUrl();

    String prepareAcceptedFiles(String valueString);
}
