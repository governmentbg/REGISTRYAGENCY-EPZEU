package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Контейнер на данни за регистриране на документ във входящ регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DataForRegistrationOfDocumentInIncomingRegisterDto", description = "Контейнер на данни за регистриране на документ във входящ регистър.")
public class DataForRegistrationOfDocumentInIncomingRegisterDto {

    /** Номер на входящ регистър. */
    @Schema(name = "incomingRegisterNumber", description = "Номер на входящ регистър.")
    private Integer incomingRegisterNumber;

    /** Дата на регистрация. */
    @Schema(name = "registrationDate", description = "Дата на регистрация.")
    private LocalDate registrationDate;
}
