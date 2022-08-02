package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Country;
import bg.registryagency.epzeu.pr.application.segment.Name;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class NameValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final String CYRILLIC_REGEX_VALIDATOR = "^[А-Яа-я-' ]{1,50}$";
    private final String LATIN_REGEX_VALIDATOR = "^[A-Za-z-' ]{1,50}$";

    private final String EMPTY_FIRST_NAME_FIELD_ERROR = "GL_INPUT_PERSON_FIRSTNAME_E";
    private final String EMPTY_FAMILY_NAME_FIELD_ERROR = "GL_INPUT_PERSON_FAMILYNAME_E";
    private final String INCORRECT_NAME_ERROR = "GL_INPUT_CORRECT_NAME_E";

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> nameValidationParams) {
        Name name = (Name) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(name == null) {
            errors.add(new ApplicationError(EMPTY_FIRST_NAME_FIELD_ERROR, labelMessageSource.getMessage(EMPTY_FIRST_NAME_FIELD_ERROR)));
            errors.add(new ApplicationError(EMPTY_FAMILY_NAME_FIELD_ERROR, labelMessageSource.getMessage(EMPTY_FAMILY_NAME_FIELD_ERROR)));

            return errors;
        }

        Country country = (Country) nameValidationParams.get(ValidationParamKey.VALIDATE_NAME_WITH_PARAMS);

        if(anyValidName(name, CYRILLIC_REGEX_VALIDATOR, errors) && anyValidName(name, LATIN_REGEX_VALIDATOR, errors) && country != null && !country.getCode().equals(ApplicationConstants.COUNTRY_BULGARIA_CODE)) {
            errors.add(new ApplicationError(INCORRECT_NAME_ERROR, labelMessageSource.getMessage(INCORRECT_NAME_ERROR)));
        }
        else if (country != null && country.getCode() != null && country.getCode().equals(ApplicationConstants.COUNTRY_BULGARIA_CODE)) {
                validateNames(CYRILLIC_REGEX_VALIDATOR, name, errors);
        } else {
            if(StringUtils.hasText(name.getFirstName()) && name.getFirstName().matches(CYRILLIC_REGEX_VALIDATOR)) {
                validateNames(CYRILLIC_REGEX_VALIDATOR, name, errors);
            } else {
                validateNames(LATIN_REGEX_VALIDATOR, name, errors);
            }
        }

        return errors;
    }

    private boolean isValidName(String regex, String name, Boolean addError, List<ApplicationError> errors) {
        if (!name.matches(regex)) {
            if(addError) {
                errors.add(new ApplicationError(INCORRECT_NAME_ERROR, labelMessageSource.getMessage(INCORRECT_NAME_ERROR)));
            }
            return false;
        }
        return true;
    }

    private void validateNames(String regex, Name name, List<ApplicationError> errors) {

        if(StringUtils.hasText(name.getFirstName())) {
            isValidName(regex, name.getFirstName(), true, errors);
        } else {
            errors.add(new ApplicationError(EMPTY_FIRST_NAME_FIELD_ERROR, labelMessageSource.getMessage(EMPTY_FIRST_NAME_FIELD_ERROR)));
        }
        if(StringUtils.hasText(name.getFamilyName())) {
            isValidName(regex, name.getFamilyName(), true, errors);
        } else {
            errors.add(new ApplicationError(EMPTY_FAMILY_NAME_FIELD_ERROR, labelMessageSource.getMessage(EMPTY_FAMILY_NAME_FIELD_ERROR)));
        }
        if(StringUtils.hasText(name.getSurName())) {
            isValidName(regex, name.getSurName(), true, errors);
        }
    }

    private Boolean anyValidName(Name name, String regex, List<ApplicationError> errors) {
        boolean isValidFirstName = false;
        boolean isValidFamilyName = false;
        boolean isValidSurName = false;

        if(StringUtils.hasText(name.getFirstName())) {
            isValidFirstName = isValidName(regex, name.getFirstName(), false, errors);
        }
        if(StringUtils.hasText(name.getFamilyName())) {
            isValidFamilyName = isValidName(regex, name.getFamilyName(), false, errors);
        }
        if(StringUtils.hasText(name.getSurName())) {
            isValidSurName = isValidName(regex, name.getSurName(), false, errors);
        }

        return isValidFirstName || isValidFamilyName || isValidSurName;
    }

}
