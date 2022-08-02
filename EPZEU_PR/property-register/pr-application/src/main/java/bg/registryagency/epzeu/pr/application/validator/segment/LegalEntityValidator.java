package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.LegalEntity;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;

@Component
@RequiredArgsConstructor
public class LegalEntityValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final CountryValidator countryValidator;
    private final CompanyCaseValidator companyCaseValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        LegalEntity legalEntity = (LegalEntity) objectToValidate;

        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);
        validationParams.put(ValidationParamKey.LEGAL_ENTITY, true);
        validationParams.put(ValidationParamKey.INDIVIDUAL, false);
        //Get needed params from input params and put them to country validation params
        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES));
        validationParams.put(ValidationParamKey.PATH_TO_ERROR, params.get(ValidationParamKey.PATH_TO_ERROR));
        errors.addAll(countryValidator.validate(legalEntity.getCountry(), validationParams));

        List<ApplicationError> companyCaseErrors = new ArrayList<>();

        // legalEntityNumber validation
        if (legalEntity.getCountry() != null &&
            legalEntity.getCountry().getCode().equals(ApplicationConstants.COUNTRY_BULGARIA_CODE)) {

            //companyCase validation
            companyCaseErrors = companyCaseValidator.validate(legalEntity.getCompanyCase(), null);

            errors.addAll(companyCaseErrors);

            String numberOfCompanyCase = legalEntity.getCompanyCase() != null ? legalEntity.getCompanyCase().getNumber() : null;
            String registrationCourtOfCompanyCase = legalEntity.getCompanyCase() != null ?
                    legalEntity.getCompanyCase().getRegistrationCourt() != null ?
                    legalEntity.getCompanyCase().getRegistrationCourt().getName() : null : null;

            //checking if both company case and legal entity number have empty fields
            if ((!StringUtils.hasText(numberOfCompanyCase) || !StringUtils.hasText(registrationCourtOfCompanyCase) ||
                companyCaseErrors.size() > 0) && !StringUtils.hasText(legalEntity.getLegalEntityNumber())) {

                if(!(params.containsKey(ValidationParamKey.VALIDATE_FOR_OWNERS) && (Boolean) params.get(ValidationParamKey.VALIDATE_FOR_OWNERS))) {
                    errors.add(new ApplicationError("PR_APP_INPUT_00001_E", labelMessageSource.getMessage("PR_APP_INPUT_00001_E")));
                }
            } else if (StringUtils.hasText(legalEntity.getLegalEntityNumber())) {
                if (!(ValidatorHelper.validateNineDigitsBulstat(legalEntity.getLegalEntityNumber())
                    || ValidatorHelper.validateThirteenDigitsBulstat(legalEntity.getLegalEntityNumber()))) {
                    errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
                }
            }
        }

        //companyName validation
        if (!StringUtils.hasText(legalEntity.getCompanyName())) {
            errors.add(new ApplicationError("PR_APP_INPUT_COMPANY_NAME_E", labelMessageSource.getMessage("PR_APP_INPUT_COMPANY_NAME_E")));
        }

        return errors;
    }
}
