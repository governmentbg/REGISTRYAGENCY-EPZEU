package bg.registryagency.epzeu.pr.integration.api.domain;

import com.fasterxml.jackson.annotation.JsonRawValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за съдържание на заявление.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationProcessContentDto", description = "Контейнер на данни за съдържание на заявление.")
public class ApplicationProcessContentDto {

    /** Идентификатор на съдържание на заявление. */
    @Schema(name = "applicationProcessContentId", description = "Идентификатор на съдържание на заявление.")
    private Long applicationProcessContentId;

    /** Вид на съдържанието */
    @Schema(name = "type", description = "Вид на съдържанието")
    private String type;

    /** Процес на заявяване на услуга, в който участва Съдържанието на заявление. */
    @Schema(name = "applicationProcess", description = "Процес на заявяване на услуга, в който участва Съдържанието на заявление.")
    private ApplicationProcessDto applicationProcess;

    /** Съдържанието на заявлението json формат. */
    @Schema(name = "content", description = "Съдържанието на заявлението json формат.")
    @JsonRawValue
    private String content;
}
