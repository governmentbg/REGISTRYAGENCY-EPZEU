package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за лице от справка чрез отдалечен достъп.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PersonOfReportDto", description = "Контейнер на данни за лице от справка чрез отдалечен достъп.")
public class PersonOfReportDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Служба по вписванията.")
    private RegistryOfficeDto registryOffice;

    /** Тип на лицето: физическо / юридическо. */
    @Schema(name = "type", description = "Тип на лицето: физическо / юридическо.")
    private PersonTypeNomenclature type;

    /** Физическо лице. */
    @Schema(name = "individual", description = "Физическо лице.")
    private IndividualOfReportDto individual;

    /** Юридическо лице. */
    @Schema(name = "legalEntity", description = "Юридическо лице.")
    private LegalEntityOfReportDto legalEntity;
}
