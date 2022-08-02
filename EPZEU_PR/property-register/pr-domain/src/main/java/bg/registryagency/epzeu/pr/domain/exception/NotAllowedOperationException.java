package bg.registryagency.epzeu.pr.domain.exception;

import lombok.Getter;

@Getter
public class NotAllowedOperationException extends RuntimeException {

    public NotAllowedOperationException(String details) {
        super(details);
    }

    public NotAllowedOperationException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
