package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ContactData;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.application.validator.segment.AddressValidator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ContactDataValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final AddressValidator addressValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {
        List<ApplicationError> errors = new ArrayList<>();

        ContactData contactData = (ContactData) objectToValidate;

        if(!ValidatorHelper.validateEmailAddress(contactData.getAppEmailAddress())) {
            errors.add(new ApplicationError("GL_INPUT_VALID_EMAIL_E", labelMessageSource.getMessage("GL_INPUT_VALID_EMAIL_E")));
        }

        if(contactData.getPhone() == null || contactData.getPhone().equals("")) {
            errors.add(new ApplicationError("PR_INPUT_PHONE_NUMBER_E", labelMessageSource.getMessage("PR_INPUT_PHONE_NUMBER_E")));
        }

        if(params != null) {
            params.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_APP_CONTACT_DATA_L"));
        }

        errors.addAll(addressValidator.validate(contactData.getAddress(), params));

        return errors;
    }
}
