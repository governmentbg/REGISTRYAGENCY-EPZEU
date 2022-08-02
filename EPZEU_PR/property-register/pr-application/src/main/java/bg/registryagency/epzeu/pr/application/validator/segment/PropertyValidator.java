package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Property;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.PlaceNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PropertyValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PropertyTypeValidator propertyTypeValidator;
    private final PlaceNomenclaturePrValidator placeNomenclaturePr;
    private final PlaceNomenclatureCache placeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        Property property = (Property) objectToValidate;

        errors.addAll(propertyTypeValidator.validate(property.getType(), params));

        //settlement
        errors.addAll(placeNomenclaturePr.validate(property.getSettlement(), params));

        if (StringUtils.hasText(property.getCadastralId()) &&
            !property.getCadastralId().matches("^(\\d{5})\\.(\\d{1,4})\\.(\\d{1,4})((\\.\\d{1,4})?(\\.\\d{1,4})?)$")) {
            errors.add(new ApplicationError("PR_APP_00066_E", labelMessageSource.getMessage("PR_APP_00066_E")));
        }

        if (property.getSettlement() != null &&
            StringUtils.hasText(property.getCadastralId()) &&
            property.getCadastralId().matches("^(\\d{5})\\.(\\d{1,4})\\.(\\d{1,4})((\\.\\d{1,4})?(\\.\\d{1,4})?)$")) {
            String settlementEkatteCode = placeNomenclatureCache.get(property.getSettlement().getId()) != null ?
                placeNomenclatureCache.get(property.getSettlement().getId()).getEkatte() : null;

            if (StringUtils.hasText(property.getCadastralId()) && settlementEkatteCode != null) {
                if (!property.getCadastralId().substring(0, 5).equals(settlementEkatteCode)) {
                    errors.add(new ApplicationError("PR_APP_00085_E", labelMessageSource.getMessage("PR_APP_00085_E")));
                }
            }
        }

        if (StringUtils.hasText(property.getAccountNumber()) && !property.getAccountNumber().matches("^\\d+$")) {
            errors.add(new ApplicationError("GL_INPUT_DIGIT_VALUE_E", labelMessageSource.getMessage("GL_INPUT_DIGIT_VALUE_E")));
        }

        if (property.getAreaByDocuments() == null) {
            errors.add(new ApplicationError("PR_APP_00042_E", labelMessageSource.getMessage("PR_APP_00042_E")));
        }

        if (!StringUtils.hasText(property.getPropertyLimits())) {
            errors.add(new ApplicationError("PR_APP_00043_E", labelMessageSource.getMessage("PR_APP_00043_E")));
        }

        return errors;
    }
}
