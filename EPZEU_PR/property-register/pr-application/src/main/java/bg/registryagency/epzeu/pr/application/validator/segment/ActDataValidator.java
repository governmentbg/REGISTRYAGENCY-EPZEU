package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.ActData;
import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInBook;
import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInDoubleIncomingRegister;
import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInIncomingRegister;
import bg.registryagency.epzeu.pr.application.validator.*;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ActDataValidator implements Validator {

    private final DocumentInBookValidator documentInBookValidator;
    private final DocumentInIncomingRegisterValidator documentInIncomingRegisterValidator;
    private final DocumentInDoubleIncomingRegisterValidator documentInDoubleIncomingRegisterValidator;

    private final LabelMessageSource labelMessageSource;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        ActData actData = (ActData) objectToValidate;

        List<ApplicationError> errors = new ArrayList<>();

        if(isInBookDataEmpty(actData.getDataForRegistrationOfDocumentInBook()) &&
            isInRegisterDataEmpty(actData.getDataForRegistrationOfDocumentInIncomingRegister()) &&
            isInDoubleRegisterDataEmpty(actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister())) {

            errors.add(new ApplicationError("PR_APP_00094_E", labelMessageSource.getMessage("PR_APP_00094_E")));
        }

        if(!isInBookDataEmpty(actData.getDataForRegistrationOfDocumentInBook()) &&
            (actData.getDataForRegistrationOfDocumentInBook().getActNumber() == null ||
                actData.getDataForRegistrationOfDocumentInBook().getVolume() == null ||
                actData.getDataForRegistrationOfDocumentInBook().getYear() < 1000 ||
                !StringUtils.hasText(actData.getDataForRegistrationOfDocumentInBook().getBook().getId()))) {

            errors.add(new ApplicationError("PR_APP_00039_E", labelMessageSource.getMessage("PR_APP_00039_E")));
        }

        if(!isInRegisterDataEmpty(actData.getDataForRegistrationOfDocumentInIncomingRegister()) &&
            (actData.getDataForRegistrationOfDocumentInIncomingRegister().getIncomingRegisterNumber() == null ||
                actData.getDataForRegistrationOfDocumentInIncomingRegister().getRegistrationDate() == null ||
                actData.getDataForRegistrationOfDocumentInIncomingRegister().getRegistrationDate().isAfter(LocalDate.now()))) {

            errors.add(new ApplicationError("PR_APP_00069_E", labelMessageSource.getMessage("PR_APP_00069_E")));
        }

        if(!isInDoubleRegisterDataEmpty(actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister()) &&
            (actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister().getDoubleIncomingRegisterNumber() == null ||
                actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister().getYear() < 1000)) {

            errors.add(new ApplicationError("PR_APP_00068_E", labelMessageSource.getMessage("PR_APP_00068_E")));
        }

        if(actData.getDataForRegistrationOfDocumentInBook() != null) {
            errors.addAll(documentInBookValidator.validate(actData.getDataForRegistrationOfDocumentInBook(), null));
        }

        if(actData.getDataForRegistrationOfDocumentInIncomingRegister() != null) {
            errors.addAll(documentInIncomingRegisterValidator.validate(actData.getDataForRegistrationOfDocumentInIncomingRegister(), null));
        }

        if(actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister() != null) {
            errors.addAll(documentInDoubleIncomingRegisterValidator.validate(actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister(), null));
        }

        return errors;
    }

    private boolean isInBookDataEmpty(DataForRegistrationOfDocumentInBook inBookData) {

        return inBookData == null || inBookData.getActNumber() == null &&
            inBookData.getVolume() == null &&
            inBookData.getYear() == 0 &&
            !StringUtils.hasText(inBookData.getBook().getId());
    }

    private boolean isInRegisterDataEmpty(DataForRegistrationOfDocumentInIncomingRegister inRegisterData) {

        return inRegisterData == null || inRegisterData.getIncomingRegisterNumber() == null &&
            inRegisterData.getRegistrationDate() == null;
    }

    private boolean isInDoubleRegisterDataEmpty(DataForRegistrationOfDocumentInDoubleIncomingRegister inDoubleRegisterData) {

        return inDoubleRegisterData == null || inDoubleRegisterData.getDoubleIncomingRegisterNumber() == null &&
            inDoubleRegisterData.getYear() == 0;
    }
}
