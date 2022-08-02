package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;


/**
 * Контейнер на данни за прикачен документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AttachedDocumentDto", description = "Контейнер на данни за прикачен документ.")
public class
AttachedDocumentDto {
    /** Уникален идентификатор на документ. */
    @Schema(name = "documentUniqueId", description = "Уникален идентификатор на документ.")
    private String documentUniqueId;

    /** Идентификатор на документ за заявлението. */
    @Schema(name = "applicationDocumentId", description = "Идентификатор на документ за заявлението.")
    private Long applicationDocumentId;

    /** Наименование на документ. */
    @Schema(name = "name", description = "Наименование на документ.")
    @NotNull
    private String name;

    /** Идентификатор на вид на документ. */
    @Schema(name = "documentTypeId", description = "Идентификатор на вид на документ.")
    @NotNull
    private String documentTypeId;

    /** Наименование на вид на документ. */
    @Schema(name = "documentTypeName", description = "Наименование на вид на документ.")
    private String documentTypeName;

    /** Име на файл. */
    @Schema(name = "fileName", description = "Име на файл.")
    private String fileName;

    /** Тип на съдържанието. */
    @Schema(name = "contentType", description = "Тип на съдържанието.")
    private String contentType;

    /** Размер на файл. */
    @Schema(name = "size", description = "Размер на файл.")
    private Long size;

    /** Алгоритъм за хеширане. */
    @Schema(name = "hashAlgorithm", description = "Алгоритъм за хеширане.")
    private String hashAlgorithm;

    /** Хеш */
    @Schema(name = "hash", description = "Хеш")
    private byte[] hash;
}
