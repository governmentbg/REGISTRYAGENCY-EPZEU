package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForNotCertifiedCopy;
import bg.registryagency.epzeu.pr.application.validator.segment.ActRequestingACopyValidator;
import bg.registryagency.epzeu.pr.application.validator.segment.ContactDataValidator;
import bg.registryagency.epzeu.pr.application.validator.segment.IndividualValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ApplicationForNotCertifiedCopyValidator implements Validator {

    private final IndividualValidator individualValidator;
    private final ActRequestingACopyValidator actRequestingACopyValidator;
    private final ContactDataValidator contactDataValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ApplicationForNotCertifiedCopy applicationForNotCertifiedCopy = (ApplicationForNotCertifiedCopy) objectToValidate;

        Map<ValidationParamKey, Object> commonParams = new EnumMap<>(ValidationParamKey.class);

        List<ApplicationError> errors = new ArrayList<>();

        commonParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        errors.addAll(individualValidator.validate(applicationForNotCertifiedCopy.getApplicantData(), commonParams));

        errors.addAll(actRequestingACopyValidator.validate(applicationForNotCertifiedCopy.getActRequestingACopy(), null));

        errors.addAll(contactDataValidator.validate(applicationForNotCertifiedCopy.getContactData(), null));

        return errors;
    }
}
