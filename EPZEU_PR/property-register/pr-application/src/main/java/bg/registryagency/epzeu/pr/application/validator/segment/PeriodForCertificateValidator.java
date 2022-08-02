package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PeriodForCertificate;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PeriodForCertificateValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PeriodForReportValidator periodForReportValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        PeriodForCertificate periodForCertificate = (PeriodForCertificate) objectToValidate;

        //check if the date is after today's date
        if(periodForCertificate.getExpectedRegistrationDate() != null && periodForCertificate.getExpectedRegistrationDate().isAfter(LocalDate.now())) {
            errors.add(new ApplicationError("PR_APP_EXPECTED_REGISTRATION_DATE_E", labelMessageSource.getMessage("PR_APP_EXPECTED_REGISTRATION_DATE_E")));
        }

        errors.addAll(periodForReportValidator.validate(periodForCertificate.getPeriodForReport(), null));

        return errors;
    }
}
