package bg.registryagency.epzeu.pr.application.exception;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import lombok.Getter;

/**
 * Thrown when using an Application which the system does not support.
 *
 * For example it is thrown when ApplicationFormProviderFactory tries to create ApplicationFormProvider which is not exists for passed Application.Type
 */
@Getter
public class UnsupportedApplicationException extends RuntimeException {
    private final ApplicationType type;

    public UnsupportedApplicationException(ApplicationType type) {
        super("Application type " + type + " is not supported");
        this.type = type;
    }

    public UnsupportedApplicationException(ApplicationType type, String details) {
        super(details);
        this.type = type;
    }

    public UnsupportedApplicationException(ApplicationType type, String details, Throwable throwable) {
        super(details, throwable);
        this.type = type;
    }
}
