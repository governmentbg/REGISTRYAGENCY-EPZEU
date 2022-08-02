package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за upload на заявление.
 */
@Getter
@RequiredArgsConstructor
@Schema(name = "UploadApplicationRequest", description = "Контейнер на данни за upload на заявление.")
public class UploadApplicationRequest {

    /** Идентификатор на съдържание на заявление. */
    @Schema(name = "applicatoinContentId", description = "Идентификатор на съдържание на заявление.")
    private final Long applicatoinContentId;

    /** Съдържание за качване. */
    @Schema(name = "contentBytes", description = "Съдържание за качване.")
    private final byte[] contentBytes;
}
