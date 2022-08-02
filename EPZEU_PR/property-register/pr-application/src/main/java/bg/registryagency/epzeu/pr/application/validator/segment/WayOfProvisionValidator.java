package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.DeliveryMethodNomenclature;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvision;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.ApplicationTypeReauNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class WayOfProvisionValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final RegistryOfficeValidator  registryOfficeValidator;
    private final DeliveryMethodTypeValidator deliveryMethodTypeValidator;
    private final ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();
        Map<ValidationParamKey, Object> paramsMap = new EnumMap<>(ValidationParamKey.class);
        WayOfProvision wayOfProvision = (WayOfProvision) objectToValidate;

        //валидация на "Служба по вписванията, в която да се издаде удостоверението"
        errors.addAll(registryOfficeValidator.validate(wayOfProvision.getIssuingAuthority(), paramsMap));

        String id = wayOfProvision.getDeliveryMethodType() != null ? wayOfProvision.getDeliveryMethodType().getId() : null;

        if(id != null && wayOfProvision.getDeliveryMethodType().getId().equals(DeliveryMethodNomenclature.ON_THE_COUNTER.getId()) ||
           id != null && wayOfProvision.getDeliveryMethodType().getId().equals(DeliveryMethodNomenclature.ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId())) {
            paramsMap.put(ValidationParamKey.VALIDATE_REGISTRY_OFFICE_ON_THE_COUNTER_IS_CHECKED_PARAMS, true);
        } else {
            paramsMap.put(ValidationParamKey.VALIDATE_REGISTRY_OFFICE_ON_THE_COUNTER_IS_CHECKED_PARAMS, false);
        }

        //валидация на "Служба по вписванията за получаване" на хартиен носител
        paramsMap.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);
        paramsMap.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L"));

        errors.addAll(registryOfficeValidator.validate(wayOfProvision.getReceivingOffice(), paramsMap));

        errors.addAll(deliveryMethodTypeValidator.validate(wayOfProvision.getDeliveryMethodType(), null));

        ApplicationType applicationType = (ApplicationType)params.get(ValidationParamKey.APPLICATION_TYPE);
        ApplicationTypeReauNomDto applicationTypeNom = applicationTypeNomenclatureCache.get(applicationType.getCode());

       boolean isInvalidServiceType = applicationTypeNom == null || applicationTypeNom.getPrices().stream().noneMatch(p -> p.getPrServiceTypeID().equals(wayOfProvision.getServiceTypeId()));
        if(isInvalidServiceType) {
            errors.add(new ApplicationError("PR_INCORR_CNFG_SERVICE_TYPE_E", labelMessageSource.getMessage("PR_INCORR_CNFG_SERVICE_TYPE_E")));
        }

        return errors;
    }
}
