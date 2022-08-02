package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.RequestForReportOfAccountProperty;
import bg.registryagency.epzeu.pr.application.RequestForReportOfDocument;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class RequestForReportOfAccountPropertyValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        RequestForReportOfAccountProperty application = (RequestForReportOfAccountProperty) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(application.getAccountProperty() == null) {
            errors.add(new ApplicationError("PR_APP_00033_INQ_E", labelMessageSource.getMessage("PR_APP_00033_INQ_E")));
        }

        return errors;
    }
}
