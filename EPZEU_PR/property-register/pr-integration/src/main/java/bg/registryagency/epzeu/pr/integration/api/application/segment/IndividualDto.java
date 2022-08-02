package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.NameDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за физическо лице.
 */
@Getter
@Setter
@Schema(name = "IndividualDto", description = "Контейнер на данни за физическо лице.")
public class IndividualDto {

    /** Националност на лицето. */
    @Schema(name = "personNationality", description = "Националност на лицето.")
    protected CountryDto personNationality;

    /** Идентификатор на лицето. */
    @Schema(name = "identity", description = "Идентификатор на лицето.")
    protected String identity;

    /** Име на лицето. */
    @Schema(name = "name", description = "Име на лицето.")
    protected NameDto name;

    /** Място на раждане на лицето. */
    @Schema(name = "birthPlace", description = "Място на раждане на лицето.")
    protected BirthPlaceDto birthPlace;

    /** БУЛСТАТ */
    @Schema(name = "bulstat", description = "БУЛСТАТ")
    protected String bulstat;


    public IndividualDto() {
        this(true);
    }

    public IndividualDto(boolean createAll) {
        if(createAll) {
            this.personNationality = new CountryDto();
            this.name = new NameDto();
            this.birthPlace = new BirthPlaceDto();
        }
    }
}
