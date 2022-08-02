package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PropertyDocument;
import bg.registryagency.epzeu.pr.application.segment.PropertyDocumentTypeNomenclature;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PropertyDocumentValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();
        //check if act of ownership has invalid fields
         boolean isValid = true;
        PropertyDocument propertyDocument = (PropertyDocument) objectToValidate;

        if (propertyDocument != null) {
            if (propertyDocument.getType() != null) {
                if (PropertyDocumentTypeNomenclature.fromInteger(1).equals(propertyDocument.getType())) {

                   isValid = validateField(propertyDocument.getActNumber(), isValid ,errors);
                   isValid = validateField(propertyDocument.getVolume(), isValid, errors);
                   isValid = validateField(propertyDocument.getIncomingRegisterNumber(),isValid ,errors);

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    String dateAsString = propertyDocument.getPropertyDocumentDate().format(formatter);

                    if (!ValidatorHelper.validateBirthDate(dateAsString)) {
                        isValid = false;
                    }

                    if(!isValid) {
                        errors.add(new ApplicationError("PR_APP_00095_E", labelMessageSource.getMessage("PR_APP_00095_E")));
                    }
                } else if (PropertyDocumentTypeNomenclature.fromInteger(2).equals(propertyDocument.getType()) ||
                           PropertyDocumentTypeNomenclature.fromInteger(3).equals(propertyDocument.getType())) {
                    if (!StringUtils.hasText(propertyDocument.getDescription())) {
                        errors.add(new ApplicationError("PR_APP_00045_E", labelMessageSource.getMessage("PR_APP_00045_E")));
                    }
                }
            } else {
                if(params.containsKey(ValidationParamKey.IS_SINGLE_DOCUMENT) && (Boolean) params.get(ValidationParamKey.IS_SINGLE_DOCUMENT)) {
                    errors.add(new ApplicationError("PR_APP_00107_E", labelMessageSource.getMessage("PR_APP_00107_E")));
                }
            }
        }

        return errors;
    }

    private boolean validateField(Integer field, boolean isValid,  List<ApplicationError> errors) {
        if (field == null) {
            isValid = false;
            errors.add(new ApplicationError("GL_INPUT_DIGIT_VALUE_E", labelMessageSource.getMessage("GL_INPUT_DIGIT_VALUE_E")));
        }
        return isValid;
    }
}
