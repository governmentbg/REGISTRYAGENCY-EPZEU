package bg.registryagency.epzeu.pr.domain.exception;

import lombok.Getter;

@Getter
public class NotAllowedFileException extends RuntimeException {

    private String code;
    private String allowedFileFormats;
    private long fileSize;
    private long allowedSize;

    public NotAllowedFileException(String details) {
        super(details);
    }

    public NotAllowedFileException(String code, String allowedFileFormats, String details) {
        super(details);

        this.code = code;
        this.allowedFileFormats = allowedFileFormats;
    }

    public NotAllowedFileException(String code, long fileSize, long allowedSize, String details) {
        super(details);

        this.code = code;
        this.fileSize = fileSize;
        this.allowedSize = allowedSize;
    }

    public NotAllowedFileException(String details, Throwable throwable) {
        super(details, throwable);
    }
}
