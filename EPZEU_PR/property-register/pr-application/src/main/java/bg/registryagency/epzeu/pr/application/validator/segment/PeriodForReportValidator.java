package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PeriodForReport;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
public class PeriodForReportValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        PeriodForReport periodForReport = (PeriodForReport) objectToValidate;

        if (periodForReport.getStartDate() == null) {
            errors.add(new ApplicationError("PR_APP_00067_E", labelMessageSource.getMessage("PR_APP_00067_E")));
        }

        if (periodForReport.getEndDate() != null && periodForReport.getEndDate().isAfter(LocalDate.now()) ||
            periodForReport.getStartDate() != null && periodForReport.getStartDate().isAfter(LocalDate.now())) {

            errors.add(new ApplicationError("PR_APP_INVALID_DATE_E", labelMessageSource.getMessage("PR_APP_INVALID_DATE_E")));
        }

        if(periodForReport.getStartDate() != null && periodForReport.getEndDate() != null) {
            if (periodForReport.getStartDate().isAfter(periodForReport.getEndDate())) {

                errors.add(new ApplicationError("PR_APP_00073_E", labelMessageSource.getMessage("PR_APP_00073_E")));
            }
        }
        return errors;
    }
}
