package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ApplicantDataWithQualityValidator implements Validator {
    private final LabelMessageSource labelMessageSource;

    private final IndividualValidator individualValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ApplicantData applicantData = (ApplicantData) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        errors.addAll(individualValidator.validate(applicantData.getIndividual(), params));

        if(applicantData.getApplicantType() == null || !StringUtils.hasText(applicantData.getApplicantType().name())) {
            errors.add(new ApplicationError("PR_APP_TYPE_APPLICANT_E", labelMessageSource.getMessage("PR_APP_TYPE_APPLICANT_E")));
        }

        if(applicantData.getApplicantCategory() == null ||
            applicantData.getApplicantCategory().getId() == null ||
            !StringUtils.hasText(applicantData.getApplicantCategory().getName())) {

            errors.add(new ApplicationError("PR_APP_GROUNDS_FOR_ISSUING_THE_COPY_E", labelMessageSource.getMessage("PR_APP_GROUNDS_FOR_ISSUING_THE_COPY_E")));
        }

        return errors;
    }
}
