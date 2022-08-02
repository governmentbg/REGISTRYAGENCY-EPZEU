package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class IdentityValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();
        Identity identity = (Identity) objectToValidate;

        if(!params.containsKey(ValidationParamKey.VALIDATE_FOR_OWNERS)) {
            if (identity == null || !StringUtils.hasText(identity.getEgn()) && !StringUtils.hasText(identity.getLnch()) && birthDateIsNull(identity.getBirthDate())) {

                errors.add(new ApplicationError("GL_INPUT_PERSON_ID_BIRTHDATE_E", labelMessageSource.getMessage("GL_INPUT_PERSON_ID_BIRTHDATE_E")));
            } else if (!(validateEgn(identity) || validateLnch(identity) || validateBirthDate(identity))) {

                errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
            }
        } else {
            if(identity != null && !(validateEgn(identity) || validateLnch(identity) || validateBirthDate(identity))) {
                errors.add(new ApplicationError("GL_INVALID_IDENTIFIER_E", labelMessageSource.getMessage("GL_INVALID_IDENTIFIER_E")));
            }
        }

        return errors;
    }

    private Boolean birthDateIsNull(LocalDate date) {
        return date == null;
    }

    private Boolean validateEgn(Identity identity) {
        if(identity.getEgn() == null) {
            return false;
        }
        return ValidatorHelper.validateEgn(identity.getEgn());
    }

    private Boolean validateLnch(Identity identity) {
        if(identity.getLnch() == null) {
            return false;
        }
        return ValidatorHelper.validateLnch(identity.getLnch());
    }

    private Boolean validateBirthDate(Identity identity) {
        if(identity.getBirthDate() == null) {
            return false;
        }
        return ValidatorHelper.validateBirthDate(identity.getBirthDate().toString());
    }
}
