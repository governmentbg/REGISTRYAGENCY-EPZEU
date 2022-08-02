package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за място на раждане.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "BirthPlaceDto", description = "Контейнер на данни за място на раждане.")
public class BirthPlaceDto {

    /** Държава */
    @Schema(name = "country", description = "Държава")
    protected String country;

    /** Място на раждане. */
    @Schema(name = "place", description = "Място на раждане.")
    protected String place;
}
