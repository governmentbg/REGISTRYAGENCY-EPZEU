package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Owners;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OwnersValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final PersonValidator personValidator;
    private final PropertyDocumentValidator propertyDocumentValidator;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        Owners owners = (Owners) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if (owners != null) {
            params.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

            if (params.containsKey(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS) && (Boolean) params.get(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS)) {
                //Validations for previous owners
                if (owners.getPersons() != null && owners.getPropertyDocuments() != null) {
                    if (owners.getPersons().size() != 0) {
                        params.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_APP_PREVIOUS_OWNERS_L"));

                        validatePersons(owners, params, errors);
                    }
                    if (owners.getPropertyDocuments().size() != 0) {
                        validatePropertyDocuments(owners, errors);
                    }
                }
            } else {
                //Validations for current owners
                params.put(ValidationParamKey.PATH_TO_ERROR, labelMessageSource.getMessage("PR_APP_CURRENT_OWNERS_L"));

                validatePersons(owners, params, errors);
                validatePropertyDocuments(owners, errors);
            }
        }
        return errors;
    }

    private void validatePersons(Owners owners, Map<ValidationParamKey, Object> params, List<ApplicationError> errors) {
        params.put(ValidationParamKey.VALIDATE_FOR_OWNERS, true);

        if (owners.getPersons() != null) {
            if (owners.getPersons().size() == 1) {
                params.put(ValidationParamKey.IS_SINGLE_PERSON, true);
                errors.addAll(personValidator.validate(owners.getPersons().get(0), params));
            } else {
                for (int i = 0; i < owners.getPersons().size(); i++) {
                    List<ApplicationError> currentErrors = new ArrayList<>(personValidator.validate(owners.getPersons().get(i), params));
                    List<String> codeList = getAsCodeStringList(currentErrors);

                    if (codeList.contains("PR_APP_00058_E") || codeList.contains("PR_INPUT_PERSON_NATIONALITY_E") ||
                        codeList.contains("PR_INPUT_COUNTRY_E") || codeList.contains("GL_INPUT_PERSON_ID_BIRTHDATE_E") ||
                        codeList.contains("GL_INPUT_PERSON_FIRSTNAME_E") || codeList.contains("GL_INPUT_PERSON_FAMILYNAME_E") ||
                        codeList.contains("PR_APP_INPUT_00001_E") || codeList.contains("PR_APP_INPUT_COMPANY_NAME_E") ||
                        (owners.getPersons().get(i).getIndividual() == null && owners.getPersons().get(i).getLegalEntity() == null)) {

                            errors.add(new ApplicationError("PR_APP_00108_E", labelMessageSource.getMessage("PR_APP_00108_E")));
                    }

                    errors.addAll(currentErrors);
                }

                //check for persons with duplicated identity number or bulstat for Individual
                //EGN
                List<String> allValidEgn = owners.getPersons().stream().filter(p -> p.getIndividual() != null &&
                    p.getIndividual().getIdentity() != null &&
                    StringUtils.hasText(p.getIndividual().getIdentity().getEgn()) &&
                    ValidatorHelper.validateEgn(p.getIndividual().getIdentity().getEgn()))
                    .map(p -> p.getIndividual().getIdentity().getEgn()).collect(Collectors.toList());

                Set<String> allDifferentEgn = new HashSet<>(allValidEgn);

                if (allValidEgn.size() != allDifferentEgn.size()) {
                    errors.add(new ApplicationError("PR_APP_00100_E", labelMessageSource.getMessage("PR_APP_00100_E")));
                }
                //LNCH
                List<String> allValidLNCH = owners.getPersons().stream().filter(p -> p.getIndividual() != null &&
                    p.getIndividual().getIdentity() != null &&
                    StringUtils.hasText(p.getIndividual().getIdentity().getLnch()) &&
                    ValidatorHelper.validateLnch(p.getIndividual().getIdentity().getLnch()))
                    .map(p -> p.getIndividual().getIdentity().getLnch()).collect(Collectors.toList());

                Set<String> allDifferentLNCH = new HashSet<>(allValidLNCH);

                if (allValidLNCH.size() != allDifferentLNCH.size()) {
                    errors.add(new ApplicationError("PR_APP_00100_E", labelMessageSource.getMessage("PR_APP_00100_E")));
                }
                //Bulstat
                List<String> allValidBulstat = owners.getPersons().stream().filter(p -> p.getIndividual() != null &&
                    StringUtils.hasText(p.getIndividual().getBulstat()) &&
                    (ValidatorHelper.validateNineDigitsBulstat(p.getIndividual().getBulstat()) || ValidatorHelper.validateThirteenDigitsBulstat(p.getIndividual().getBulstat())))
                    .map(p -> p.getIndividual().getBulstat()).collect(Collectors.toList());

                Set<String> allDifferentBulstat = new HashSet<>(allValidBulstat);

                if (allValidBulstat.size() != allDifferentBulstat.size()) {
                    errors.add(new ApplicationError("PR_APP_00100_E", labelMessageSource.getMessage("PR_APP_00100_E")));
                }
                //Bulstat for Legal Entity
                List<String> allValidBulstatForLegalEntity = owners.getPersons().stream().filter(p -> p.getLegalEntity() != null &&
                    StringUtils.hasText(p.getLegalEntity().getLegalEntityNumber()) &&
                    (ValidatorHelper.validateNineDigitsBulstat(p.getLegalEntity().getLegalEntityNumber()) || ValidatorHelper.validateThirteenDigitsBulstat(p.getLegalEntity().getLegalEntityNumber())))
                    .map(p -> p.getLegalEntity().getLegalEntityNumber()).collect(Collectors.toList());

                Set<String> allDifferentBulstatForLegalEntity = new HashSet<>(allValidBulstatForLegalEntity);

                if (allValidBulstatForLegalEntity.size() != allDifferentBulstatForLegalEntity.size()) {
                    errors.add(new ApplicationError("PR_APP_00103_E", labelMessageSource.getMessage("PR_APP_00103_E")));
                }
            }
        }
    }

    private void validatePropertyDocuments(Owners owners, List<ApplicationError> errors) {

        Map<ValidationParamKey, Object> params = new EnumMap<>(ValidationParamKey.class);

        if (owners.getPropertyDocuments() != null) {
            if (owners.getPropertyDocuments().size() == 1) {
                params.put(ValidationParamKey.IS_SINGLE_DOCUMENT, true);
                errors.addAll(propertyDocumentValidator.validate(owners.getPropertyDocuments().get(0), params));
            } else {
                owners.getPropertyDocuments().forEach(document -> {
                    List<ApplicationError> currentErrors = new ArrayList<>(propertyDocumentValidator.validate(document, params));
                    List<String> codeList = getAsCodeStringList(currentErrors);

                    if (codeList.contains("PR_APP_00107_E") || codeList.contains("PR_APP_00095_E") || codeList.contains("PR_APP_00045_E") || document.getType() == null) {
                        errors.add(new ApplicationError("PR_APP_00108_E", labelMessageSource.getMessage("PR_APP_00108_E")));
                    }
                    errors.addAll(currentErrors);
                });
            }
        }
    }

    private List<String> getAsCodeStringList(List<ApplicationError> errors) {
        return errors.stream().map(ApplicationError::getCode).collect(Collectors.toList());
    }
}
