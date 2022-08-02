package bg.registryagency.epzeu.pr.integration.api.domain;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Контейнер на данни за чернови на заявления.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ApplicationDto", description = "Контейнер на данни за чернови на заявления.")
public class ApplicationDto {
    /** Уникален идентификатор на заявление. */
//    @Positive
    @Schema(name = "applicationId", description = "Уникален идентификатор на заявление.")
    private Long applicationId;

    /** Ред на заявлението. */
//    @Positive
    @Schema(name = "order", description = "Ред на заявлението.")
    private Integer order;

    /** Вид на заявление. */
    @Schema(name = "type", description = "Вид на заявление.")
    private Integer type;

    /** Процес на заявяване, в който участва заявлението. */
    @Schema(name = "applicationProcess", description = "Процес на заявяване, в който участва заявлението.")
    private ApplicationProcessDto applicationProcess;

    /** Идентификатор на процес на заявяване. */
    @Schema(name = "applicationProcessId", description = "Идентификатор на процес на заявяване.")
    private Long applicationProcessId;

    /** Съдържание на заявлението. */
    @Schema(name = "applicationProcessContent", description = "Съдържание на заявлението.")
    private ApplicationProcessContentDto applicationProcessContent;

    /** Списък с прикачени документи. */
    @Schema(name = "applicationDocuments", description = "Списък с прикачени документи.")
    private List<ApplicationDocumentDto> applicationDocuments;

    /** Допълнителни данни. */
    @Schema(name = "additionalData", description = "Допълнителни данни.")
    private ObjectNode additionalData;
}
