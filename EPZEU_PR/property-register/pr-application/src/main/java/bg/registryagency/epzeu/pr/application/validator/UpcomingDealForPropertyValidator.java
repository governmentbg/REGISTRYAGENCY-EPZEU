package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.segment.UpcomingDealForProperty;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.*;

import static java.time.temporal.ChronoUnit.DAYS;

@Component
@RequiredArgsConstructor
public class UpcomingDealForPropertyValidator implements Validator{

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        var application = (UpcomingDealForProperty) objectToValidate;

        if(application.getCadastralIds() == null || application.getCadastralIds().size() == 0) {
            errors.add(new ApplicationError("PR_EMPTY_PROP_LIST_E", labelMessageSource.getMessage("PR_EMPTY_PROP_LIST_E")));
        }

        if(application.getCadastralIds() != null && application.getCadastralIds().size() > 0) {
            application.getCadastralIds().forEach(cadastralId -> {
                if(!cadastralId.matches("^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$")) {
                    errors.add(new ApplicationError("PR_APP_00066_E", labelMessageSource.getMessage("PR_APP_00066_E")));
                }
            });
            Set<String> checkForDuplicatedValues = new HashSet<>(application.getCadastralIds());
            if(application.getCadastralIds().size() != checkForDuplicatedValues.size()) {
                errors.add(new ApplicationError("PR_UPCOMING_DEALS_ALREADY_ADDED_E", labelMessageSource.getMessage("PR_UPCOMING_DEALS_ALREADY_ADDED_E")));
            }
        }

        if(!StringUtils.hasText(application.getPropertyDealType())) {
            errors.add(new ApplicationError("PR_MISSING_TRANSACT_TYPE_E", labelMessageSource.getMessage("PR_MISSING_TRANSACT_TYPE_E")));
        }

        if (application.getPropertyDealDate() != null && application.getPropertyDealDate().isBefore(LocalDate.now())) {

            errors.add(new ApplicationError("PR_INVALID_TRANSCT_DATE_E", labelMessageSource.getMessage("PR_INVALID_TRANSCT_DATE_E")));
        } else if(application.getPropertyDealDate() != null && DAYS.between(LocalDate.now(), application.getPropertyDealDate()) > 30) {

            errors.add(new ApplicationError("PR_TRANSCT_DATE_NO_LATER_THAN_E", labelMessageSource.getMessage("PR_TRANSCT_DATE_NO_LATER_THAN_E")));
        }

        return errors;
    }
}
