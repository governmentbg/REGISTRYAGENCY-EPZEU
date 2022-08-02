package bg.registryagency.epzeu.pr.web.api.internal.exception;

import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.domain.exception.NotAllowedFileException;
import bg.registryagency.epzeu.pr.domain.exception.NotAllowedOperationException;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.web.common.exception.TooManyRequestsException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.zalando.problem.Problem;
import org.zalando.problem.Status;
import org.zalando.problem.spring.web.advice.ProblemHandling;
import org.zalando.problem.spring.web.advice.security.AuthenticationAdviceTrait;

import java.util.List;
import java.util.Locale;


@ControllerAdvice
@RequiredArgsConstructor
public class ExceptionTranslator implements ProblemHandling, AuthenticationAdviceTrait {

    private final LabelMessageSource labelMessageSource;

    /**
     * Handles all exceptions which do not have specific handler and translate them to clients.
     * This handler is also useful against leakage of information because all exceptions which do not have own handler will be filtrated.
     * @param ex handled exception
     * @param request which thrown exception
     * @return ResponseEntity of Problem
     */
    @ExceptionHandler
    public ResponseEntity<Problem> handleException(Exception ex, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.INTERNAL_SERVER_ERROR)
            .withDetail("Internal Server Error")
            .withTitle("Internal Server Error")
            .with("message", labelMessageSource.getMessageOrDefault("GL_ERROR_L", "Възникна грешка!"))
            .with("code", "GL_ERROR_L")
            .build();

        return create(ex, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(NotAllowedOperationException ex, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.CONFLICT)
            .withDetail(ex.getLocalizedMessage())
            .withTitle("The request could not be completed due to a conflict with the current state of the resource")
            .with("message", labelMessageSource.getMessageOrDefault("GL_ERROR_L", "Възникна грешка!"))
            .with("code", "GL_ERROR_L")
            .build();

        return create(ex, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(TooManyRequestsException ex, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.TOO_MANY_REQUESTS)
            .withTitle("Too many requests")
            .with("message", labelMessageSource.getMessageOrDefault("GL_TOO_MANY_REQUESTS_E", "Достигнат е максимално допустимият брой заявки към системата."))
            .with("code", "GL_TOO_MANY_REQUESTS_E")
            .build();

        return create(ex, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(org.springframework.web.reactive.function.client.WebClientResponseException.TooManyRequests ex, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.TOO_MANY_REQUESTS)
            .withTitle("Too many requests")
            .with("message", labelMessageSource.getMessageOrDefault("GL_TOO_MANY_REQUESTS_E", "Достигнат е максимално допустимият брой заявки към системата."))
            .with("code", "GL_TOO_MANY_REQUESTS_E")
            .build();

        return create(ex, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(ApplicationDataException e, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.BAD_REQUEST)
            .withTitle("Application errors")
            .with("message", e.getMessage())
            .with("code", e.getCode())
            .with("innerErrors", e.getValidationErrors())
            .build();

        return create(e, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(NotAllowedFileException e, NativeWebRequest request) {
        String errorMessage = null;

        if(e.getCode().equals("GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E")) {
            errorMessage = labelMessageSource.getMessageOrDefault(e.getCode(), new String[] {e.getAllowedFileFormats()}, "Не може да качите този файл.");
        } else if(e.getCode().equals("GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E")) {
            errorMessage = labelMessageSource.getMessageOrDefault(e.getCode(), new Long[] {e.getFileSize(), e.getAllowedSize()}, "Надхвърлен е допустимият размер на прикачен файл.");
        }

        Problem problem = Problem.builder()
            .withStatus(Status.FORBIDDEN)
            .withTitle("File uploading errors")
            .with("message", errorMessage)
            .with("code", e.getCode())
            .build();

        return create(e, problem, request);
    }

    @ExceptionHandler
    public ResponseEntity<Problem> handleException(AccessDeniedException e, NativeWebRequest request) {
        Problem problem = Problem.builder()
            .withStatus(Status.FORBIDDEN)
            .withTitle(Status.FORBIDDEN.getReasonPhrase())
            .with("message", labelMessageSource.getMessageOrDefault("GL_EP_USR_NOT_ACCESS_RIGHTS_E", "Нямате права за достъп до избраната функционалност."))
            .with("code", "GL_EP_USR_NOT_ACCESS_RIGHTS_E")
            .build();

        return create(e, problem, request);
    }
}
