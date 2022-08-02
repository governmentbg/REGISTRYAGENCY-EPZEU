package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ActRequestingACopy;
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
public class ActRequestingACopyValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final ActDataValidator actDataValidator;
    private final ActOldDataValidator actOldDataValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ActRequestingACopy actRequestingACopy = (ActRequestingACopy) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(!StringUtils.hasText(actRequestingACopy.getCopyReason())) {
            errors.add(new ApplicationError("PR_APP_00097_E", labelMessageSource.getMessage("PR_APP_00097_E")));
        }

        if(actRequestingACopy.getRegistryOffice() == null || !StringUtils.hasText(actRequestingACopy.getRegistryOffice().getId())) {
            errors.add(new ApplicationError("PR_APP_00020_E", labelMessageSource.getMessage("PR_APP_00020_E")));
        } else {

            if (actRequestingACopy.getActData() == null && actRequestingACopy.getActOldData() == null) {
                errors.add(new ApplicationError("PR_APP_00089_E", labelMessageSource.getMessage("PR_APP_00089_E")));
            } else {
                if(actRequestingACopy.getActData() != null) {
                    errors.addAll(actDataValidator.validate(actRequestingACopy.getActData(), null));
                }
                if(actRequestingACopy.getActOldData() != null) {
                    errors.addAll(actOldDataValidator.validate(actRequestingACopy.getActOldData(), null));
                }
            }
        }

        return errors;
    }
}
