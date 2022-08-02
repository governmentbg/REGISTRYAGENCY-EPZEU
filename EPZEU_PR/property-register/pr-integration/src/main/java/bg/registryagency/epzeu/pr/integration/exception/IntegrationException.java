package bg.registryagency.epzeu.pr.integration.exception;

import lombok.Getter;

@Getter
public class IntegrationException extends RuntimeException {
    private String code;

    public IntegrationException(String code, String message) {
        super(message);
        this.code = code;
    }

    public IntegrationException(String message) {
        super(message);
    }

    public IntegrationException(String message, Throwable e) {
        super(message, e);
    }
}
