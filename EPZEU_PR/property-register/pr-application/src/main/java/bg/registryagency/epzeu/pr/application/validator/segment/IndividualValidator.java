package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Individual;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class IndividualValidator implements Validator {

    private final CountryValidator countryValidator;
    private final IdentityValidator identityValidator;
    private final NameValidator nameValidator;
    private final BirthPlaceValidator birthPlaceValidator;
    private final BulstatValidator bulstatValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> sectionParams) {
        Individual individual = (Individual) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        Map<ValidationParamKey, Object> validationParams = new EnumMap<>(ValidationParamKey.class);
        validationParams.put(ValidationParamKey.INDIVIDUAL, true);
        validationParams.put(ValidationParamKey.LEGAL_ENTITY, false);
        //Get needed params from section params and put them to country validation params
        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, sectionParams.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES));
        validationParams.put(ValidationParamKey.PATH_TO_ERROR, sectionParams.get(ValidationParamKey.PATH_TO_ERROR));
        errors.addAll(countryValidator.validate(individual.getPersonNationality(), validationParams));

        errors.addAll(identityValidator.validate(individual.getIdentity(), sectionParams));

        //check if birth place validation is required
        if (sectionParams.containsKey(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA) && (Boolean) sectionParams.get(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA)) {
            //check only if it's inserted date of birth
            if (individual.getIdentity() != null) {
                if (individual.getIdentity().getBirthDate() != null &&
                    ValidatorHelper.validateBirthDate(individual.getIdentity().getBirthDate().toString())) {

                    validationParams.put(ValidationParamKey.VALIDATE_BIRTH_PLACE_WITH_PARAMS, individual.getIdentity());
                    errors.addAll(birthPlaceValidator.validate(individual.getBirthPlace(), validationParams));
                }
            }
        }

        validationParams.put(ValidationParamKey.VALIDATE_NAME_WITH_PARAMS, individual.getPersonNationality());
        errors.addAll(nameValidator.validate(individual.getName(), validationParams));

        if (individual.getPersonNationality() != null && individual.getPersonNationality().getCode() != null) {
            if (!individual.getPersonNationality().getCode().equals(ApplicationConstants.COUNTRY_BULGARIA_CODE)) {

                // in applicant data there is no bulstat so we need to check it only for person
                if (!(sectionParams.containsKey(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA) && (Boolean) sectionParams.get(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA))) {
                    errors.addAll(bulstatValidator.validate(individual.getBulstat(), validationParams));
                }
            }
        }

        return errors;
    }
}
