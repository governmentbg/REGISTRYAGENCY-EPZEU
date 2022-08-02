package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;

import java.util.List;

public interface AppParameterService {
    List<AppParameter> getAppParameters();

    AppParameter getAppParameter(String appParamCode);
}
