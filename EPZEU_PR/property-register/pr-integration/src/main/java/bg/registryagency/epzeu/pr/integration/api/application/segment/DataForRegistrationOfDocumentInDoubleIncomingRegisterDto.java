package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за регистрация на документ в двойно входящ регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DataForRegistrationOfDocumentInDoubleIncomingRegisterDto", description = "Контейнер на данни за регистрация на документ в двойно входящ регистър. ")
public class DataForRegistrationOfDocumentInDoubleIncomingRegisterDto {

    /** Номер на двойновходящ регистър. */
    @Schema(name = "doubleIncomingRegisterNumber", description = "Номер на двойновходящ регистър.")
    private Integer doubleIncomingRegisterNumber;

    /** Година */
    @Schema(name = "year", description = "Година")
    private Short year;
}
