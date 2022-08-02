package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForUpcomingDealForProperty;
import bg.registryagency.epzeu.pr.application.validator.segment.ApplicantDataWithQualityForUpcomingDealValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ApplicationForUpcomingDealValidator implements Validator {

    private final ApplicantDataWithQualityForUpcomingDealValidator applicantDataWithQualityForUpcomingDealValidator;
    private final UpcomingDealForPropertyValidator upcomingDealForPropertyValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);

        ApplicationForUpcomingDealForProperty application = (ApplicationForUpcomingDealForProperty) objectToValidate;

        errors.addAll(applicantDataWithQualityForUpcomingDealValidator.validate(application.getApplicantData(), validationParams));

        errors.addAll(upcomingDealForPropertyValidator.validate(application.getUpcomingDealForProperty(), null));

        return errors;
    }
}
