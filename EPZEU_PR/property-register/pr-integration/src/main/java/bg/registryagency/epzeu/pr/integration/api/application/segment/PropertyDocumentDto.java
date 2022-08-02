package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


/**
 * Контейнер на данни за документ за имот.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertyDocumentDto", description = "Контейнер на данни за документ за имот.")
public class PropertyDocumentDto {

    /** Вид на документа. */
    @Schema(name = "type", description = "Вид на документа.")
    private Integer type;

    /** Номер на акт. */
    @Schema(name = "actNumber", description = "Номер на акт.")
    private Integer actNumber;

    /** Том */
    @Schema(name = "volume", description = "Том")
    private Integer volume;

    /** Номер на входящ регистър. */
    @Schema(name = "incomingRegisterNumber", description = "Номер на входящ регистър.")
    private Integer incomingRegisterNumber;

    /** Дата на документа. */
    @Schema(name = "propertyDocumentDate", description = "Дата на документа.")
    private LocalDate propertyDocumentDate;

    /** Описание на документа. */
    @Schema(name = "description", description = "Описание на документа.")
    private String description;
}
