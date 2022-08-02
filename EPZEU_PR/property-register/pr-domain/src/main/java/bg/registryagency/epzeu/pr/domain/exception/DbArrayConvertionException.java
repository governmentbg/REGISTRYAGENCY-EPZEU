package bg.registryagency.epzeu.pr.domain.exception;

public class DbArrayConvertionException extends RuntimeException {

    public DbArrayConvertionException(String details) {
        super(details);
    }

    public DbArrayConvertionException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
