package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.PlaceNomenclaturePr;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.PlaceNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PlaceNomenclaturePrValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PlaceNomenclatureCache placeNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        PlaceNomenclaturePr placeNomenclaturePr = (PlaceNomenclaturePr) objectToValidate;

        if(placeNomenclaturePr == null || !StringUtils.hasText(placeNomenclaturePr.getName())) {
            errors.add(new ApplicationError("PR_APP_00040_E", labelMessageSource.getMessage("PR_APP_00040_E")));
        } else {
            if(params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES) != null
                && (Boolean) params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES)
                && placeNomenclatureCache.get(placeNomenclaturePr.getId()) == null) {

                errors.add(new ApplicationError("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")));

                //Construct path to field where is selected already deleted nomenclature
                var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                    labelMessageSource.getMessage("GL_PLACE_L") + Validator.errorMessageDelimiter +
                    placeNomenclaturePr.getName();

                errors.add(new ApplicationError("PR_APP_00040_E", pathToError));
            }
        }

        return errors;
    }
}
