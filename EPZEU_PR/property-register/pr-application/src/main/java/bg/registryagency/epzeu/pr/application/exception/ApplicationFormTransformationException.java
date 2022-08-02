package bg.registryagency.epzeu.pr.application.exception;

import lombok.Getter;

@Getter
public class ApplicationFormTransformationException extends RuntimeException {
    public ApplicationFormTransformationException(String details) {
        super(details);
    }

    public ApplicationFormTransformationException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
