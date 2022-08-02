package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.json.DateStringToLocalDateTimeDeserializer;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import bg.registryagency.epzeu.pr.integration.util.IdentityUtil;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

/**
 * Контейнер на данни за резултат от търсене на физическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "IndividualSearchResponse", description = "Контейнер на данни за резултат от търсене на физическо лице.")
public class IndividualSearchResponse {

    /** Идентификатор на лице */
    @Schema(name = "citizenId", description = "Идентификатор на лице")
    private String citizenId;

    /** Идентификатор на служба */
    @Schema(name = "siteId", description = "Идентификатор на служба")
    protected String siteId;

    /** Първо име */
    @Schema(name = "firstName", description = "Първо име")
    protected String firstName;

    /** Презиме */
    @Schema(name = "middleName", description = "Презиме")
    protected String middleName;

    /** Фамилия */
    @Schema(name = "lastName", description = "Фамилия")
    protected String lastName;

    /** ЕГН */
    @Schema(name = "egn", description = "ЕГН")
    protected String egn;

    /** Втора фамилия */
    @Schema(name = "secondLastName", description = "Втора фамилия")
    private String secondLastName;

    /** Вид лице */
    @Schema(name = "citizenTypeId", description = "Вид лице")
    private String citizenTypeId;

    /** Номер на персонална партида */
    @Schema(name = "personalLotNumber", description = "Номер на персонална партида")
    private String personalLotNumber;

    /** Код на държава */
    @Schema(name = "countryCode", description = "Код на държава")
    private String countryCode;

    /** Дата на раждане */
    @Schema(name = "birthDate", description = "Дата на раждане")
    @JsonDeserialize(using = DateStringToLocalDateTimeDeserializer.class)
    private LocalDateTime birthDate;


    public PersonOfReportDto asPersonOfReport() {

        PersonOfReportDto personOfReport = new PersonOfReportDto();
        personOfReport.setId(this.citizenId);
        personOfReport.setType(PersonTypeNomenclature.INDIVIDUAL);
        personOfReport.setRegistryOffice(new RegistryOfficeDto(this.siteId));
        personOfReport.setIndividual(new IndividualOfReportDto());
        if (this.egn != null) {
            personOfReport.getIndividual().setIdentity(IdentityUtil.maskIdentity(egn));
        } else if (this.birthDate != null) {
            personOfReport.getIndividual().setIdentity(IdentityUtil.maskIdentity(String.format("%1$tY%1$tm%1$td", birthDate)));
        }

        if(StringUtils.hasText(this.countryCode)) {
            personOfReport.getIndividual().setPersonNationality(new CountryDto(Short.valueOf(this.countryCode)));
        }
        personOfReport.getIndividual().setApplicantName(new NameDto());
        personOfReport.getIndividual().getApplicantName().setFirstName(this.firstName);
        personOfReport.getIndividual().getApplicantName().setSurName(this.middleName);
        personOfReport.getIndividual().getApplicantName().setFamilyName(this.lastName);
        return personOfReport;
    }
}
