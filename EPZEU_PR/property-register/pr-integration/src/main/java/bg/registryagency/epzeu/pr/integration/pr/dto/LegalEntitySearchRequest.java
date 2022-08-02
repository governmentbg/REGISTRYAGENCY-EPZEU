package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.StringUtils;

/**
 * Контейнер на данни за заявка за търсене на юридическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntitySearchRequest", description = "Контейнер на данни за заявка за търсене на юридическо лице.")
public class LegalEntitySearchRequest {

    /** Идентификатор на служба. */
    @Schema(name = "siteId", description = "Идентификатор на служба.")
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
    protected String courtId;

    /** Година */
    @Schema(name = "year", description = "Година")
    protected String year;

    /** Код на държава. */
    @Schema(name = "countryCode", description = "Код на държава.")
    protected String countryCode;

    /** Флаг указващ, дали да се търсят активни записи */
    @Schema(name = "active", description = "Флаг указващ, дали да се търсят активни записи")
    protected int active;

    public LegalEntitySearchRequest(LegalEntitySearchCriteriaDto legalEntitySearchCriteria) {

        //In our search criteria is possible to enter CompanyIdBulstat when LegalEntity is bulgarian when it is not user enter ForeignLegalEntityIdentifier
        //in backoffice of Property Register there are not split fields the can be passed through field bulstat
        String legalEntityNumber = StringUtils.hasText(legalEntitySearchCriteria.getCompanyIdBulstat()) ?
            legalEntitySearchCriteria.getCompanyIdBulstat() :
            legalEntitySearchCriteria.getForeignLegalEntityIdentifier();

        this.siteId = legalEntitySearchCriteria.getRegistryOfficeId();
        this.companyName = legalEntitySearchCriteria.getCompanyName() != null ? legalEntitySearchCriteria.getCompanyName().trim() : null;
        this.bulstat =  legalEntityNumber;
        this.caseNumber = legalEntitySearchCriteria.getCompanyCaseNumber();
        this.courtId =legalEntitySearchCriteria.getCompanyCaseCourtId();
        this.year = legalEntitySearchCriteria.getCompanyCaseYear();
        this.countryCode = legalEntitySearchCriteria.getCountryCodeISO();
        //Portal have to search only active individuals, when set active to 1 that means to search active individuals
        this.active = 1;

        switch(legalEntitySearchCriteria.searchModeForLegalEntity){
            case 0:
                //Default
                break;
            case 1:
                //Starts With
                this.companyName =  this.companyName + "%";
                break;
            case 2:
                //Contains
                this.companyName =  "%" + this.companyName + "%";
                break;
        }
    }
}
