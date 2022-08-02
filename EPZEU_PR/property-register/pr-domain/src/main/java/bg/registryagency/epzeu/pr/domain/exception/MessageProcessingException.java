package bg.registryagency.epzeu.pr.domain.exception;

public class MessageProcessingException extends RuntimeException {
    public MessageProcessingException(String details) {
        super(details);
    }

    public MessageProcessingException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
