package bg.registryagency.epzeu.pr.application.exception;

import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ApplicationDataException extends Exception {
    private String code;
    private List<ApplicationError> validationErrors;

    public ApplicationDataException(String code, String message) {
        super(message);
        this.code = code;
    }

    public ApplicationDataException(String code, String message, ApplicationError validationError) {
        super(message);
        this.code = code;
        this.validationErrors = new ArrayList<>(1);
        this.validationErrors.add(validationError);
    }

    public ApplicationDataException(String code, String message, List<ApplicationError> validationErrors) {
        super(message);
        this.code = code;
        this.validationErrors = validationErrors;
    }
}
