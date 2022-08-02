package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Person;
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
public class PersonValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final IndividualValidator individualValidator;
    private final LegalEntityValidator legalEntityValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();
        Person person = (Person) objectToValidate;

        if(person.getIndividual() != null) {
            errors.addAll(individualValidator.validate(person.getIndividual(), params));

        } else if(person.getLegalEntity() != null) {
            errors.addAll(legalEntityValidator.validate(person.getLegalEntity(), params));

        } else {
            //If it is not selected whether is individual or legal entity and is chosen only one person(for example owners section)
            boolean isSinglePerson = params.containsKey(ValidationParamKey.IS_SINGLE_PERSON) && (Boolean) params.get(ValidationParamKey.IS_SINGLE_PERSON);
            if(isSinglePerson) {
                errors.add(new ApplicationError("PR_APP_00058_E", labelMessageSource.getMessage("PR_APP_00058_E")));
            }
        }

        return errors;
    }
}
