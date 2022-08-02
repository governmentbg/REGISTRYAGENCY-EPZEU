package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за допълнителна информация за одитен запис.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AuditAdditionalData", description = "Контейнер на данни за допълнителна информация за одитен запис")
public class AuditAdditionalData {

    /** Вид заявление. */
    @Schema(name = "applicationType", description = "Вид заявление.")
    private String applicationType;

    /** Допълнителни данни. */
    @Schema(name = "additionalData", description = "Допълнителни данни.")
    private Object additionalData;

    public AuditAdditionalData(String applicationType, Object additionalData) {
        this.applicationType = applicationType;
        this.additionalData = additionalData;
    }
}
