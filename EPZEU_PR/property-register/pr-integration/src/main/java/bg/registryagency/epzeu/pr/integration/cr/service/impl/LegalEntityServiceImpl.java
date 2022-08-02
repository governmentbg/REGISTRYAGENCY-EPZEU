package bg.registryagency.epzeu.pr.integration.cr.service.impl;

import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import bg.registryagency.epzeu.pr.integration.bulstat.client.LegalEntityBulstatWebClient;
import bg.registryagency.epzeu.pr.integration.cr.client.LegalEntityWebClient;
import bg.registryagency.epzeu.pr.integration.cr.service.LegalEntityService;
import bg.registryagency.epzeu.pr.integration.exception.IntegrationException;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class LegalEntityServiceImpl implements LegalEntityService {

    private final LegalEntityWebClient legalEntityWebClient;
    private final LegalEntityBulstatWebClient legalEntityBulstatWebClient;
    private final LabelMessageSource labelMessageSource;

    @Override
    public Mono<Object> getLegalEntity(String legalEntityNumber) {
        try {
            LegalEntityIntegration legalEntity = (LegalEntityIntegration) Mono.from(legalEntityWebClient.getLegalEntity(legalEntityNumber)).block();

            if (legalEntity != null) {
                return Mono.just(legalEntity);
            } else {
                legalEntity = (LegalEntityIntegration) Mono.from(legalEntityBulstatWebClient.getLegalEntity(legalEntityNumber)).block();

                if (legalEntity.getCompanyName() != null) {
                    return Mono.just(legalEntity);
                } else {
                    return Mono.error(new IntegrationException("PR_APP_LEGAL_PERSON_NOT_FOUND_E", labelMessageSource.getMessage("PR_APP_LEGAL_PERSON_NOT_FOUND_E")));
                }
            }
        } catch(Exception ex) {
            return Mono.error(new IntegrationException("PR_APP_00115_E", labelMessageSource.getMessage("PR_APP_00115_E")));
        }
    }
}
