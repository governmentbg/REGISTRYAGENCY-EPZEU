package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.DeliveryMethodNomenclature;
import bg.registryagency.epzeu.pr.application.segment.DeliveryMethodType;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DeliveryMethodTypeValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        DeliveryMethodType deliveryMethodType = (DeliveryMethodType) objectToValidate;

        if(!(deliveryMethodType != null && deliveryMethodType.getId().equals(DeliveryMethodNomenclature.AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId()) ||
             deliveryMethodType != null && deliveryMethodType.getId().equals(DeliveryMethodNomenclature.ON_THE_COUNTER.getId()) ||
             deliveryMethodType != null && deliveryMethodType.getId().equals(DeliveryMethodNomenclature.ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId()))) {

            errors.add(new ApplicationError("PR_APP_00088_E", labelMessageSource.getMessage("PR_APP_00088_E")));
        }

        return errors;
    }
}
