package bg.registryagency.epzeu.pr.web.common.exception;


public class TooManyRequestsException extends RuntimeException {
    public TooManyRequestsException(String details) {
        super(details);
    }

    public TooManyRequestsException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
