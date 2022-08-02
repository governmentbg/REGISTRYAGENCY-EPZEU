package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.api.application.segment.CourtDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за фирмено дело.
 */
@Getter
@Setter
@Schema(name = "CompanyCaseDto", description = "Контейнер на данни за фирмено дело.")
public class CompanyCaseDto {

    /** Номер */
    @Schema(name = "number", description = "Номер")
    private String number;

    /** Година */
    @Schema(name = "year", description = "Година")
    private Short year;

    /** Съд по регистрация. */
    @Schema(name = "registrationCourt", description = "Съд по регистрация.")
    private CourtDto registrationCourt;

    public CompanyCaseDto() {
        this.registrationCourt = new CourtDto();
    }
}
