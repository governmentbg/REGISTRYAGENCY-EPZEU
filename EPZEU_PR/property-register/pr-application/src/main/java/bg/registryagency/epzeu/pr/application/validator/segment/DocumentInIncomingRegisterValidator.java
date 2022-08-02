package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInIncomingRegister;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DocumentInIncomingRegisterValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        DataForRegistrationOfDocumentInIncomingRegister dataForRegistrationOfDocumentInIncomingRegister = (DataForRegistrationOfDocumentInIncomingRegister) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(dataForRegistrationOfDocumentInIncomingRegister.getRegistrationDate() == null ||
            dataForRegistrationOfDocumentInIncomingRegister.getRegistrationDate().isAfter(LocalDate.now())) {

            errors.add(new ApplicationError("PR_APP_INVALID_DATE_E", labelMessageSource.getMessage("PR_APP_INVALID_DATE_E")));
        }

        return errors;
    }
}
