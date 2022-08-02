package bg.registryagency.epzeu.pr.integration.api.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за прикачени документи.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationDocumentDto", description = "Контейнер на данни за прикачени документи.")
public class ApplicationDocumentDto {

    /** Уникален идентификатор на прикачен документ. */
    @Schema(name = "applicationDocumentId", description = "Уникален идентификатор на прикачен документ.")
    private Long applicationDocumentId;

    /** Име на документа. */
    @Schema(name = "name", description = "Име на документа.")
    private String name;

    /** Идентификатор на документа в Имотен Регистър/РЕАУ. */
    @Schema(name = "backOfficeGuid", description = "Идентификатор на документа в Имотен Регистър/РЕАУ.")
    private String backOfficeGuid;

    /** Големина на документа. */
    @Schema(name = "fileSize", description = "Големина на документа.")
    private Integer fileSize;

    /** Вид на приложения документ. */
    @Schema(name = "documentTypeId", description = "Вид на приложения документ.")
    private String documentTypeId;
}
