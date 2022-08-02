package bg.registryagency.epzeu.pr.application.validator;

import java.util.List;
import java.util.Map;

public interface Validator {
    String errorPathDelimiter = "->";
    String errorMessageDelimiter = ":";
    List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params);
}
