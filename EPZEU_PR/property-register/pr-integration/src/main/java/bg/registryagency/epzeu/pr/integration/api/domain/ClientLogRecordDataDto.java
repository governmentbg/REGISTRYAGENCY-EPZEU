package bg.registryagency.epzeu.pr.integration.api.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Контейнер на данни за клиентски лог запис.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ClientLogRecordDataDto", description = "Контейнер на данни за клиентски лог запис")
public class ClientLogRecordDataDto {

    /** Съобщение */
    @Schema(name = "message", description = "Съобщение")
    private String message;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Stacktrace */
    @Schema(name = "stackTrace", description = "Stacktrace")
    private String stackTrace;
}
