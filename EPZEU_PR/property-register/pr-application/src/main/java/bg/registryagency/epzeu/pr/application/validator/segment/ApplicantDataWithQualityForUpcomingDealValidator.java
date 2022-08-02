package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.SpecialAccessTypeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;

@Component
@RequiredArgsConstructor
public class ApplicantDataWithQualityForUpcomingDealValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final NameValidator nameValidator;
    private final SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);

        ApplicantData applicantData = (ApplicantData) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if (applicantData.getIndividual() != null) {
            if (applicantData.getIndividual().getPersonNationality() == null || applicantData.getIndividual().getPersonNationality().getCode() != ApplicationConstants.COUNTRY_BULGARIA_CODE) {

                errors.add(new ApplicationError("PR_INPUT_PERSON_NATIONALITY_E", labelMessageSource.getMessage("PR_INPUT_PERSON_NATIONALITY_E")));
            }

            if (applicantData.getIndividual().getIdentity() == null || !ValidatorHelper.validateEgn(applicantData.getIndividual().getIdentity().getEgn())) {

                errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
            }

            validationParams.put(ValidationParamKey.VALIDATE_NAME_WITH_PARAMS, applicantData.getIndividual().getPersonNationality());
            errors.addAll(nameValidator.validate(applicantData.getIndividual().getName(), validationParams));
        }

        if (applicantData.getApplicantType() == null ||
            !StringUtils.hasText(applicantData.getApplicantType().name()) && applicantData.getApplicantType() != ApplicantData.ApplicantTypeNomenclature.OFFICIAL_PERSON) {

            errors.add(new ApplicationError("PR_APP_TYPE_APPLICANT_E", labelMessageSource.getMessage("PR_APP_TYPE_APPLICANT_E")));
        }

        if (applicantData.getApplicantCategory() == null ||
            applicantData.getApplicantCategory().getId() == null ||
            !StringUtils.hasText(applicantData.getApplicantCategory().getName())) {

            errors.add(new ApplicationError("PR_APP_QUALITY_OF_PERSON_UPCOMING_DEAL_E", labelMessageSource.getMessage("PR_APP_QUALITY_OF_PERSON_UPCOMING_DEAL_E")));
        }

        boolean isInvalidSpecialAccessType = specialAccessTypeNomenclatureCache.asMap()
            .values()
            .stream()
            .noneMatch(specialAccessType -> specialAccessType.getName().equals(applicantData.getSpecialAccessType()));

        if (applicantData.getSpecialAccessType() == null || isInvalidSpecialAccessType) {

            errors.add(new ApplicationError("PR_APP_TYPE_APPLICANT_E", labelMessageSource.getMessage("PR_APP_TYPE_APPLICANT_E")));
        }

        return errors;
    }
}
