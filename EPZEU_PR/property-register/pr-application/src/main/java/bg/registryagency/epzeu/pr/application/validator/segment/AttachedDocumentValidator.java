package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.AttachedDocument;
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
public class AttachedDocumentValidator implements Validator {
    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        AttachedDocument document = (AttachedDocument) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(document.getDocumentFileMetadata().getSize() == 0) {
            errors.add(new ApplicationError("GL_UPLOAD_FILE_E", labelMessageSource.getMessage("GL_UPLOAD_FILE_E")));
        }

        return errors;
    }
}
