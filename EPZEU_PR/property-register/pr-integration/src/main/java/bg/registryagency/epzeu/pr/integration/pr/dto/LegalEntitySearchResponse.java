package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.api.application.segment.CourtDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.StringUtils;

/**
 * Контейнер на данни за резултат от търсене на юридическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntitySearchResponse", description = "Контейнер на данни за резултат от търсене на юридическо лице.")
public class LegalEntitySearchResponse {

    /** Идентификатор на лице. */
    @Schema(name = "legalEntityId", description = "Идентификатор на лице.")
    private String legalEntityId;

    /** Идентификатор на служба. */
    @Schema(name = "siteId", description = "Идентификатор на служба по вписванията.")
    protected String siteId;

    /** Има на лице. */
    @Schema(name = "companyName", description = "Има на лице.")
    protected String companyName;

    /** Булстат/ЕИК */
    @Schema(name = "bulstat", description = "Булстат/ЕИК")
    protected String bulstat;

    /** Номер на дело. */
    @Schema(name = "caseNumber", description = "Номер на дело.")
    protected String caseNumber;

    /** Идентификатор на съд. */
    @Schema(name = "courtId", description = "Идентификатор на съд.")
    protected Short courtId;

    /** Година */
    @Schema(name = "year", description = "Година")
    protected Short year;

    /** Код на държава */
    @Schema(name = "countryCode", description = "Код на държава")
    protected String countryCode;


    public PersonOfReportDto asPersonOfReport() {
        boolean createLegalEntity = false;
        boolean createCompanyCase = false;

        //Validation for fields to be greater than zero were because of data in Property Register
        if(StringUtils.hasText(this.caseNumber) || (this.courtId != null && this.courtId > 0) || (this.year != null && this.year > 0)) {
            createLegalEntity = true;
            createCompanyCase = true;
        }

        if(StringUtils.hasText(this.companyName) || StringUtils.hasText(this.bulstat) ||
            StringUtils.hasText(this.countryCode)) {
            createLegalEntity = true;
        }

        PersonOfReportDto personOfReport = new PersonOfReportDto();
        personOfReport.setId(this.legalEntityId);
        personOfReport.setType(PersonTypeNomenclature.LEGAL_ENTITY);

        personOfReport.setRegistryOffice(new RegistryOfficeDto(this.siteId));
        if(createLegalEntity) {
            personOfReport.setLegalEntity(new LegalEntityOfReportDto());
            personOfReport.getLegalEntity().setCompanyName(this.companyName);
            personOfReport.getLegalEntity().setLegalEntityNumber(this.bulstat);

            if(StringUtils.hasText(this.countryCode)) {
                personOfReport.getLegalEntity().setCountry(new CountryDto(Short.valueOf(this.countryCode)));
            }

            if(createCompanyCase) {
                CompanyCaseDto companyCaseDto = new CompanyCaseDto();
                companyCaseDto.setNumber(this.caseNumber);
                companyCaseDto.setYear(this.year);

                if(this.courtId != null) {
                    CourtDto courtDto = new CourtDto();
                    courtDto.setId(this.courtId);

                    companyCaseDto.setRegistrationCourt(courtDto);
                }
                personOfReport.getLegalEntity().setCompanyCase(companyCaseDto);
            }
        }

        return personOfReport;
    }
}
