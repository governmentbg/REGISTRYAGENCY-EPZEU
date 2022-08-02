package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

/**
 * Контейнер на данни за вид на заявление в РЕАУ.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "ApplicationTypeReauNomDto", description = "Контейнер на данни за вид на заявление в РЕАУ.")
public class ApplicationTypeReauNomDto {

    /** Идентификатор */
    @Schema(name = "applicationTypeId", description = "Идентификатор")
    private Integer applicationTypeId;

    /** Идентификатор на типа. */
    @Schema(name = "appType", description = "Идентификатор на типа.")
    private Integer appType;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Идентификатор на типа в имотен регистър. */
    @Schema(name = "prTypeId", description = "Идентификатор на типа в имотен регистър.")
    private String prTypeId;

    /** Процес в РЕАУ. */
    @Schema(name = "processInREAU", description = "Процес в РЕАУ.")
    @EqualsAndHashCode.Exclude
    private Boolean processInREAU;

    /** Цени */
    @Schema(name = "prices", description = "Цени")
    @EqualsAndHashCode.Exclude
    private List<ServicePriceDto> prices;
}
