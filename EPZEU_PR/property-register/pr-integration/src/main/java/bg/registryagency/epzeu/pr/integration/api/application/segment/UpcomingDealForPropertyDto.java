package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Контейнер на данни за предстояща сделка за имот.
 */
@Getter
@Setter
@Schema(name = "UpcomingDealForPropertyDto", description = "Контейнер на данни за предстояща сделка за имот. ")
public class UpcomingDealForPropertyDto {

    /** Списък с кадастрални идентификатори. */
    @Schema(name = "cadastralIds", description = "Списък с кадастрални идентификатори.")
    private List<String> cadastralIds;

    /** Вид на сделката. */
    @Schema(name = "propertyDealType", description = "Вид на сделката.")
    private String propertyDealType;

    /** Дата на сделката. */
    @Schema(name = "propertyDealDate", description = "Дата на сделката.")
    private LocalDate propertyDealDate;

    /** Време на сделката. */
    @Schema(name = "propertyDealTime", description = "Време на сделката.")
    private LocalDateTime propertyDealTime;
}
