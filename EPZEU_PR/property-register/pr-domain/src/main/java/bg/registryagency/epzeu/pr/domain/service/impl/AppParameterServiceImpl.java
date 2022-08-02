package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.domain.service.AppParameterService;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Реализация на интерфейс AppParameterService за работа с конфигурирани параметри.
 */
@Service
@RequiredArgsConstructor
public class AppParameterServiceImpl implements AppParameterService {
    private final AppParameterCache appParameterCache;

    @Override
    public List<AppParameter> getAppParameters() {
        return new ArrayList<>(appParameterCache.asMap().values());
    }

    @Override
    public AppParameter getAppParameter(String appParamCode) {
        return appParameterCache.get(appParamCode);
    }
}
