package bg.registryagency.epzeu.pr.integration.api.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.logging.LogLevel;

import java.util.List;

/**
 * Контейнер на данни за клиентски лог запис.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ClientLogRecordDto", description = "Контейнер на данни за клиентски лог запис.")
public class ClientLogRecordDto {

    /** Данни за лога. */
    @Schema(name = "data", description = "Данни за лога.")
    private List<ClientLogRecordDataDto> data;

    /** Ниво на лога. */
    @Schema(name = "level", description = "Ниво на лога.")
    private LogLevel level;

    /** Наименование на логера. */
    @Schema(name = "loggerName", description = "Наименование на логера.")
    private String loggerName;

    /** Начално време. */
    @Schema(name = "startTime", description = "Начално време.")
    private String startTime;
}
