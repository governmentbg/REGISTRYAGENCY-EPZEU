package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Country;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.CountriesCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CountryValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final CountriesCache countriesCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {
        List<ApplicationError> errors = new ArrayList<>();

        Country country = (Country) objectToValidate;

        if(country == null || StringUtils.isEmpty(country.getName())) {
            if((Boolean) params.get(ValidationParamKey.INDIVIDUAL)) {
                errors.add(new ApplicationError("PR_INPUT_PERSON_NATIONALITY_E", labelMessageSource.getMessage("PR_INPUT_PERSON_NATIONALITY_E")));
            } else if((Boolean) params.get(ValidationParamKey.LEGAL_ENTITY)) {
                errors.add(new ApplicationError("PR_INPUT_COUNTRY_E", labelMessageSource.getMessage("PR_INPUT_COUNTRY_E")));
            }
        } else {
            if(params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES) != null && (Boolean) params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES)) {
                //If country nomenclature is deleted after user selected it, add errors and return to user
                if(countriesCache.get(country.getCode()) == null) {
                    errors.add(new ApplicationError("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")));

                    if((Boolean) params.get(ValidationParamKey.INDIVIDUAL)) {
                        //Construct path to field where is selected already deleted nomenclature
                        var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                            labelMessageSource.getMessage("GL_PERSON_NATIONALITY_L") + Validator.errorMessageDelimiter +
                            country.getName();

                        errors.add(new ApplicationError("PR_INPUT_PERSON_NATIONALITY_E", pathToError));
                    } else if((Boolean) params.get(ValidationParamKey.LEGAL_ENTITY)) {
                        //Construct path to field where is selected already deleted nomenclature
                        var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                            labelMessageSource.getMessage("GL_COUNTRY_L") + Validator.errorMessageDelimiter +
                            country.getName();

                        errors.add(new ApplicationError("PR_INPUT_COUNTRY_E", pathToError));
                    }
                }
            }
        }
        
        return errors;
    }
}
