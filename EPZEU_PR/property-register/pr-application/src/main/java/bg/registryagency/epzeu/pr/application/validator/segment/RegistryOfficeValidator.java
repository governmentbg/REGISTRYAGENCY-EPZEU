package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.RegistryOffice;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.RegistryOfficeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class RegistryOfficeValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        RegistryOffice registryOffice = (RegistryOffice) objectToValidate;

        //валидация на "Служба по вписванията за получаване" на хартиен носител
        if(params.containsKey(ValidationParamKey.VALIDATE_REGISTRY_OFFICE_ON_THE_COUNTER_IS_CHECKED_PARAMS)) {
            if ((Boolean) params.get(ValidationParamKey.VALIDATE_REGISTRY_OFFICE_ON_THE_COUNTER_IS_CHECKED_PARAMS)) {
                if (registryOffice == null ||
                    registryOffice.getName() == null ||
                    registryOffice.getName().equals("")) {

                    errors.add(new ApplicationError("PR_INPUT_RECEIVING_OFFICE_E", labelMessageSource.getMessage("PR_INPUT_RECEIVING_OFFICE_E")));
                } else {
                    //If registry office nomenclature is deleted after user selected it, add errors and return to user
                    if(params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES) != null
                        && (Boolean) params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES)
                        && registryOfficeNomenclatureCache.get(registryOffice.getId()) == null) {

                        errors.add(new ApplicationError("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")));

                        //Construct path to field where is selected already deleted nomenclature
                        var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                            labelMessageSource.getMessage("PR_APP_RECEIVING_OFFICE_L") + Validator.errorMessageDelimiter +
                            registryOffice.getName();

                        errors.add(new ApplicationError("PR_INPUT_RECEIVING_OFFICE_E", pathToError));
                    }
                }
            }
        } else {
            //валидация на "Служба по вписванията, в която да се издаде удостоверението"
            if (registryOffice == null ||
                registryOffice.getName() == null ||
                registryOffice.getName().equals("")) {

                errors.add(new ApplicationError("PR_INPUT_ISSUING_AUTHORITY_E", labelMessageSource.getMessage("PR_INPUT_ISSUING_AUTHORITY_E")));
            }
        }

        return errors;
    }
}
