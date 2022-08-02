package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


/**
 * Контейнер на данни за резултат от качване на документ.
 */
@Getter
@Setter
@Schema(name = "UploadDocumentResponse", description = "Контейнер на данни за резултат от качване на документ.")
public class UploadDocumentResponse {

    /** Идентификатор на документ */
    @Schema(name = "docIdentifier", description = "Идентификатор на документ")
    private UUID docIdentifier;

    /** ХЕШ на документа */
    @Schema(name = "contentHash", description = "ХЕШ на документа")
    private String contentHash;

    /** Алгоритъм за хеширане */
    @Schema(name = "hashAlgorithm", description = "Алгоритъм за хеширане")
    private String hashAlgorithm;
}
