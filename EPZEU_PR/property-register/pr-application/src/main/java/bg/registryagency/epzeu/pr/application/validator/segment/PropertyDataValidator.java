package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PropertyData;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class PropertyDataValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PropertyValidator propertyValidator;
    private final OwnersValidator ownersValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();
        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);

        PropertyData propertyData = (PropertyData) objectToValidate;

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES));
        validationParams.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_REQUESTED_PROPERTY_L"));
        errors.addAll(propertyValidator.validate(propertyData.getRequestedProperty(), validationParams));

        //Current Owners
        validationParams = new EnumMap<>(ValidationParamKey.class);
        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
        errors.addAll(ownersValidator.validate(propertyData.getCurrentOwners(), validationParams));

        //Previous Owners
        validationParams = new EnumMap<>(ValidationParamKey.class);
        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, true);
        errors.addAll(ownersValidator.validate(propertyData.getPreviousOwners(), validationParams));

        return errors;
    }
}
