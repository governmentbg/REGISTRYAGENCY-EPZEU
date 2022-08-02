package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPeriod;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.CertificateDataTypeNomenclature;
import bg.registryagency.epzeu.pr.application.validator.segment.*;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class ApplicationForCertificateForPeriodValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final IndividualValidator individualValidator;
    private final PeriodForCertificateValidator periodForCertificateValidator;
    private final PersonValidator personValidator;
    private final PropertyDataValidator propertyDataValidator;
    private final WayOfProvisionValidator wayOfProvisionValidator;
    private final ContactDataValidator contactDataValidator;
    private final AttachedDocumentValidator attachedDocumentValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);

        ApplicationForCertificateForPeriod application = (ApplicationForCertificateForPeriod) objectToValidate;

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        errors.addAll(individualValidator.validate(application.getApplicantData(), validationParams));

        errors.addAll(periodForCertificateValidator.validate(application.getPeriodForCertificate(), null));

        if(application.getCertificateDataType() == CertificateDataTypeNomenclature.PERSON) {

            validationParams.put(ValidationParamKey.APPLICATION_TYPE, ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON);
            validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
            validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);
            validationParams.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_REQUESTED_PERSON_L"));

            errors.addAll(personValidator.validate(application.getRequestedPerson(), validationParams));
        } else {
            validationParams.put(ValidationParamKey.APPLICATION_TYPE, ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY);

            Map<ValidationParamKey, Object> propertyDataParams = new EnumMap<>(ValidationParamKey.class);
            propertyDataParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);
            propertyDataParams.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_REQUESTED_PROPERTY_L"));

            errors.addAll(propertyDataValidator.validate(application.getPropertyData(), propertyDataParams));
        }

        errors.addAll(wayOfProvisionValidator.validate(application.getWayOfProvision(), validationParams));

        Map<ValidationParamKey, Object> contactDataValidationParams = new EnumMap<>(ValidationParamKey.class);
        contactDataValidationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        errors.addAll(contactDataValidator.validate(application.getContactData(), contactDataValidationParams));

        if(application.getAttachedDocuments() != null) {
            application.getAttachedDocuments().forEach(document -> errors.addAll(attachedDocumentValidator.validate(document, null)));
        }
        return errors;
    }
}
