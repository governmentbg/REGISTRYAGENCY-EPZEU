package bg.registryagency.epzeu.pr.domain.exception;

public class JsonParseException extends RuntimeException {

    public JsonParseException(String details) {
        super(details);
    }

    public JsonParseException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
