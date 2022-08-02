package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForProperty;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.validator.segment.*;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class ApplicationForCertificateForPropertyValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final IndividualValidator individualValidator;
    private final PropertyValidator propertyValidator;
    private final OwnersValidator ownersValidator;
    private final WayOfProvisionValidator wayOfProvisionValidator;
    private final ContactDataValidator contactDataValidator;
    private final AttachedDocumentValidator attachedDocumentValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ApplicationForCertificateForProperty application = (ApplicationForCertificateForProperty) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        Map<ValidationParamKey, Object> individualParams = new EnumMap<>(ValidationParamKey.class);

        individualParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        errors.addAll(individualValidator.validate(application.getApplicantData(), individualParams));

        //Validate Property for which a certificate is required
        Map<ValidationParamKey, Object> propertyParams = new EnumMap<>(ValidationParamKey.class);
        propertyParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);
        propertyParams.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_REQUESTED_PROPERTY_L"));
        errors.addAll(propertyValidator.validate(application.getRequestedProperty(), propertyParams));

        //current owners
        individualParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
        errors.addAll(ownersValidator.validate(application.getCurrentOwners(), individualParams));

        //previous owners
        individualParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, true);
        errors.addAll(ownersValidator.validate(application.getPreviousOwners(), individualParams));

        Map<ValidationParamKey, Object> wayOfProvisionParams = new EnumMap<>(ValidationParamKey.class);
        wayOfProvisionParams.put(ValidationParamKey.APPLICATION_TYPE, ApplicationType.APPLICATION_CERTIFICATE_PROPERTY);
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
