package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class BulstatValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        String bulstat = (String) objectToValidate;

            if (bulstat != null && (Boolean) params.get(ValidationParamKey.INDIVIDUAL)) {
                if (!ValidatorHelper.validateNineDigitsBulstat(bulstat)) {
                    errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
                }
            } else if ((Boolean) params.get(ValidationParamKey.LEGAL_ENTITY)) {
                if (!ValidatorHelper.validateNineDigitsBulstat(bulstat) || !ValidatorHelper.validateThirteenDigitsBulstat(bulstat)) {
                    errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
                }
            }

        return errors;
    }
}
