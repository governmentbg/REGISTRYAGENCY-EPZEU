package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInBook;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DocumentInBookValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        DataForRegistrationOfDocumentInBook dataForRegistrationOfDocumentInBook = (DataForRegistrationOfDocumentInBook) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(dataForRegistrationOfDocumentInBook.getYear() < 1000) {
            errors.add(new ApplicationError("GL_INPUT_YEAR_VALUE_E", labelMessageSource.getMessage("GL_INPUT_YEAR_VALUE_E")));
        }

        return errors;
    }
}
