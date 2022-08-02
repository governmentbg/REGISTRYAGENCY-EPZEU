package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.BirthPlace;
import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class BirthPlaceValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        BirthPlace birthPlace = (BirthPlace) objectToValidate;
        List<ApplicationError> errors = new ArrayList<>();
        Identity identity = (Identity) params.get(ValidationParamKey.VALIDATE_BIRTH_PLACE_WITH_PARAMS);

        boolean isValid = true;

        if(identity != null) {
            if (identity.getBirthDate() != null) {
                if(birthPlace == null) {
                    isValid = false;
                } else {
                    if (!StringUtils.hasText(birthPlace.getCountryName())) {
                        isValid = false;
                    }
                    if (!StringUtils.hasText(birthPlace.getPlaceName())) {
                        isValid = false;
                    }
                }
            }
        }

        if(!isValid) {
            errors.add(new ApplicationError("PR_APP_INPUT_BIRTHPLACE_E", labelMessageSource.getMessage("PR_APP_INPUT_BIRTHPLACE_E")));
        }
        return errors;
    }
}
