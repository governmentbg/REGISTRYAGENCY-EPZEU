package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForCertifiedCopy;
import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.application.validator.segment.*;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ApplicationForCertifiedCopyValidator implements Validator{

    private final LabelMessageSource labelMessageSource;

    private final ApplicantDataWithQualityValidator applicantDataWithQualityValidator;
    private final PersonValidator personValidator;
    private final ActRequestingACopyValidator actRequestingACopyValidator;
    private final ContactDataValidator contactDataValidator;
    private final AttachedDocumentValidator attachedDocumentValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ApplicationForCertifiedCopy application = (ApplicationForCertifiedCopy) objectToValidate;

        Map<ValidationParamKey, Object> commonParams = new EnumMap<>(ValidationParamKey.class);
        List<ApplicationError> errors = new ArrayList<>();

        //вид документ "Пълномощно"
       final String POWER_OF_ATTORNEY_DOCUMENT_TYPE_ID = "20001100000000002021";

        commonParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        errors.addAll(applicantDataWithQualityValidator.validate(application.getApplicantData(), commonParams));

        if(application.getApplicantData().getApplicantType() == ApplicantData.ApplicantTypeNomenclature.ATTORNEY ||
            application.getApplicantData().getApplicantType() == ApplicantData.ApplicantTypeNomenclature.LEGAL_REPRESENTATIVE) {

            commonParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
            commonParams.put(ValidationParamKey.IS_SINGLE_PERSON, true);
            errors.addAll(personValidator.validate(application.getServiceRecipient().getPerson(), commonParams));
        }

        errors.addAll(actRequestingACopyValidator.validate(application.getActRequestingACopy(), null));
        errors.addAll(contactDataValidator.validate(application.getContactData(), commonParams));

        if(application.getAttachedDocuments() != null) {
            application.getAttachedDocuments().forEach(document -> errors.addAll(attachedDocumentValidator.validate(document, null)));
        }

        if(application.getApplicantData().getApplicantType() == ApplicantData.ApplicantTypeNomenclature.ATTORNEY) {
            if(application.getAttachedDocuments() != null && application.getAttachedDocuments().stream().noneMatch(d -> d.getDocumentType().getId().equals(POWER_OF_ATTORNEY_DOCUMENT_TYPE_ID))) {
                errors.add(new ApplicationError("PR_APP_00011_E", labelMessageSource.getMessage("PR_APP_00011_E")));
            }
        }

        return errors;
    }
}
