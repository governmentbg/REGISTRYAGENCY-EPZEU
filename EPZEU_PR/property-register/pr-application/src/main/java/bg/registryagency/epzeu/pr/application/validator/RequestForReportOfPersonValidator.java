package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.RequestForReportOfPerson;
import bg.registryagency.epzeu.pr.application.validator.segment.PeriodForReportValidator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class RequestForReportOfPersonValidator implements Validator {

    private final LabelMessageSource labelMessageSource;
    private final PeriodForReportValidator periodForReportValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        var requestForReportOfPerson = (RequestForReportOfPerson) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(requestForReportOfPerson.getPerson() == null) {
            errors.add(new ApplicationError("PR_APP_00033_INQ_E", labelMessageSource.getMessage("PR_APP_00033_INQ_E")));
        }

        errors.addAll(periodForReportValidator.validate(requestForReportOfPerson.getPeriodForReport(), null));

        return errors;
    }
}
