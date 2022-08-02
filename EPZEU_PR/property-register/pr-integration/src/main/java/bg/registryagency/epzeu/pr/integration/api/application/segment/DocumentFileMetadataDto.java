package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на метаданни за документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentFileMetadataDto", description = "Контейнер на метаданни за документ.")
public class DocumentFileMetadataDto {

    /** Наименование на файл. */
    @Schema(name = "fileName", description = "Наименование на файл.")
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

    /** ХЕШ на файл.*/
    @Schema(name = "hash", description = "ХЕШ на фаил.")
    private byte[] hash;
}
