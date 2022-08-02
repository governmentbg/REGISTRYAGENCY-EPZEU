package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForCertificateForPeriodDto;
import bg.registryagency.epzeu.pr.integration.cache.ApplicationTypeReauNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.ReportWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServicePriceDto;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Provider за осигуряване на заявление от тип Заявление за издаване на удостоверение за период за лице от Имотен регистър.
 */
@Component
public class ApplicationForCertificateForPeriodForPersonProvider extends BaseApplicationForCertificateForPeriodProvider {

    private final ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache;

    public ApplicationForCertificateForPeriodForPersonProvider(UserWebClient userWebClient, ApplicationWebClient applicationWebClient,
                                                               Validator applicationForCertificateForPeriodValidator,
                                                               ReportWebClient reportWebClient,
                                                               LabelMessageSource labelMessageSource,
                                                               ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache,
                                                               JsonObjectMapper jsonObjectMapper) {
        super(userWebClient, applicationWebClient, applicationForCertificateForPeriodValidator, reportWebClient, labelMessageSource, jsonObjectMapper);
        this.applicationTypeNomenclatureCache = applicationTypeNomenclatureCache;
    }

    /**
     * Създава нова инстанция на заявление от тип Заявление за издаване на удостоверение за период от Имотен регистър.
     *
     * @return Заявление за издаване на удостоверение за период от Имотен регистър.
     */
    @Override
    public ApplicationForCertificateForPeriodDto buildNewInstanceOfApplicationDto() {
        ApplicationForCertificateForPeriodDto applicationDto = new ApplicationForCertificateForPeriodDto(true);
        applicationDto.setApplicantData(buildApplicantDataDto());

        List<ServicePriceDto> prices = applicationTypeNomenclatureCache.get(ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON.getCode()).getPrices();
        if(prices != null && !prices.isEmpty()) {
            applicationDto.getWayOfProvision().setServiceTypeId(prices.get(0).getEpzeuServiceTypeID());
        }

        return applicationDto;
    }
}
