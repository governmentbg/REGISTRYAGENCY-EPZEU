package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.CompanyCase;
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
public class CompanyCaseValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        CompanyCase companyCase = (CompanyCase) objectToValidate;

        if(companyCase != null && companyCase.getYear() != null) {
            if (companyCase.getYear() < 1000) {
                errors.add(new ApplicationError("GL_INPUT_YEAR_VALUE_E", labelMessageSource.getMessage("GL_INPUT_YEAR_VALUE_E")));
            }
        }

        return errors;
    }
}
