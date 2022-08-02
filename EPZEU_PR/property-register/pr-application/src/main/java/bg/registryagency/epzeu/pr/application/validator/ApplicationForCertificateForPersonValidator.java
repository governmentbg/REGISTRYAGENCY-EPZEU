package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationContentType;
import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPerson;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.validator.segment.*;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ClientContextUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class ApplicationForCertificateForPersonValidator implements Validator {
    private final LabelMessageSource labelMessageSource;

    private final IndividualValidator individualValidator;
    private final PersonValidator personValidator;
    private final WayOfProvisionValidator wayOfProvisionValidator;
    private final ContactDataValidator contactDataValidator;
    private final AttachedDocumentValidator attachedDocumentValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {
        ApplicationForCertificateForPerson application = (ApplicationForCertificateForPerson) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if (application.getApplicationContentType().equals(ApplicationContentType.CORRECTIVE)) {
            if (application.getInitialApplicationData() == null) {
                throw new IllegalStateException("There is no InitialApplicationData for CORRECTIVE Application, executed by cin: " + ClientContextUtil.getAuthenticatedClientCin());
            }
        }

        Map<ValidationParamKey, Object> individualParams = new EnumMap<>(ValidationParamKey.class);

        individualParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        errors.addAll(individualValidator.validate(application.getApplicantData(), individualParams));

        individualParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
        individualParams.put(ValidationParamKey.IS_SINGLE_PERSON, true);
        individualParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);
        individualParams.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_REQUESTED_PERSON_L"));
        errors.addAll(personValidator.validate(application.getRequestedPerson(), individualParams));

        Map<ValidationParamKey, Object> wayOfProvisionParams = new EnumMap<>(ValidationParamKey.class);

        wayOfProvisionParams.put(ValidationParamKey.APPLICATION_TYPE, ApplicationType.APPLICATION_CERTIFICATE_PERSON);
        errors.addAll(wayOfProvisionValidator.validate(application.getWayOfProvision(), wayOfProvisionParams));

        Map<ValidationParamKey, Object> contactDataValidationParams = new EnumMap<>(ValidationParamKey.class);
        contactDataValidationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        errors.addAll(contactDataValidator.validate(application.getContactData(), contactDataValidationParams));

        if(application.getAttachedDocuments() != null) {
            application.getAttachedDocuments().forEach(document -> errors.addAll(attachedDocumentValidator.validate(document, null)));
        }

        return errors;
    }
}
