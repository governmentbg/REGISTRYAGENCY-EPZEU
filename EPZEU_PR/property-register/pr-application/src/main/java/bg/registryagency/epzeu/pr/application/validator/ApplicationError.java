package bg.registryagency.epzeu.pr.application.validator;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class ApplicationError {
    @Setter
    private String message;
    private final String code;
    @Schema(hidden = true)
    private final List<String> pathToError;
    @Schema(hidden = true)
    private final String pathSeparator;

    private final List<ApplicationError> innerErrors;

    public ApplicationError(String code, String message) {
        this.code = code;
        this.message = message;
        this.innerErrors = null;
        this.pathToError = null;
        this.pathSeparator = null;
    }

    public ApplicationError(String code, String message, List<ApplicationError> innerErrors) {
        this.message = message;
        this.code = code;
        this.innerErrors = innerErrors;
        this.pathToError = null;
        this.pathSeparator = null;
    }

    public ApplicationError(String code, String message, List<ApplicationError> innerErrors, List<String> sectionPath) {
        this.message = message;
        this.code = code;
        this.innerErrors = innerErrors;
        this.pathToError = sectionPath;
        this.pathSeparator = "->";
    }
}
