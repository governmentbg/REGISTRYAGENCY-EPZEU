package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PropertyType;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.PropertyTypeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@Component
@RequiredArgsConstructor
public class PropertyTypeValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PropertyTypeNomenclatureCache propertyTypeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        PropertyType propertyType = (PropertyType) objectToValidate;

        if(propertyType == null || !StringUtils.hasText(propertyType.getName())) {
            errors.add(new ApplicationError("PR_APP_00041_E", labelMessageSource.getMessage("PR_APP_00041_E")));
        } else {
            if(params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES) != null
                && (Boolean) params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES)
                && propertyTypeNomenclatureCache.get(propertyType.getId()) == null) {

                errors.add(new ApplicationError("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")));

                //Construct path to field where is selected already deleted nomenclature
                var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                    labelMessageSource.getMessage("PR_APP_KIND_OF_PROPERTY_L") + Validator.errorMessageDelimiter +
                    propertyType.getName();

                errors.add(new ApplicationError("PR_APP_00041_E", pathToError));
            }
        }

        return errors;
    }
}
