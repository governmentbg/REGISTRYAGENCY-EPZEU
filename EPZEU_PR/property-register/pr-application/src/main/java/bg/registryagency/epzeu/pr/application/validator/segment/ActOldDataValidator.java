package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ActOldData;
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
public class ActOldDataValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {
        ActOldData actOldData = (ActOldData) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if (!StringUtils.hasText(actOldData.getActOldNumber())
            || !StringUtils.hasText(actOldData.getVolumeOld())
            || actOldData.getYear() == 0
            || !StringUtils.hasText(actOldData.getActAdditionalData())) {

            errors.add(new ApplicationError("PR_APP_00094_E", labelMessageSource.getMessage("PR_APP_00094_E")));
        }

        if(actOldData.getYear() < 1000) {
            errors.add(new ApplicationError("GL_INPUT_YEAR_VALUE_E", labelMessageSource.getMessage("GL_INPUT_YEAR_VALUE_E")));
        }

        return errors;
    }
}
