package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import bg.registryagency.epzeu.pr.integration.epzeu.enums.SigningFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * Контейнер на данни за заявка за подписване.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "SigningRequestDto", description = "Контейнер на данни за заявка за подписване.")
public class SigningRequestDto {

    /** Съдържание */
    @Schema(name = "content", description = "Съдържание")
    @JsonIgnore
    private byte[] content;

    /** Формат */
    @Schema(name = "format", description = "Формат")
    private SigningFormat format;

    /** Име на файл */
    @Schema(name = "fileName", description = "Име на файл")
    private String fileName;

    /** Тип на съдържанието */
    @Schema(name = "contentType", description = "Тип на съдържанието")
    private String contentType;

    /** Колбак адрес при условие, че подписването е отказано. */
    @Schema(name = "rejectedCallbackUrl", description = "")
    private String rejectedCallbackUrl;

    /** Колбак адрес при условие, че подписването е успещно. */
    @Schema(name = "completedCallbackUrl", description = "")
    private String completedCallbackUrl;

    /** Списък с участници на подписването. */
    @Schema(name = "signerRequests", description = "Списък с участници на подписването.")
    private List<SignerPersonDto> signerRequests;


}
