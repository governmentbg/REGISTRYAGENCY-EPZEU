package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Контейнер на данни за заявка за търсене на физическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "IndividualSearchRequest", description = "Контейнер на данни за заявка за търсене на физическо лице.")
public class IndividualSearchRequest {

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

    /** Дата на раждане */
    @Schema(name = "dateOfBirth", description = "Дата на раждане")
    protected String dateOfBirth;

    /** Флаг указващ, дали да се търсят активни записи */
    @Schema(name = "active", description = "Флаг указващ, дали да се търсят активни записи")
    protected int active;


    public IndividualSearchRequest(IndividualSearchCriteriaDto criteria) {
        this.siteId = criteria.getRegistryOfficeId();
        this.firstName = criteria.getFirstName() != null ? criteria.getFirstName().trim() : null;
        if (criteria.getByPartOfName()) {
            this.firstName += "%";
        }
        this.middleName = criteria.getSurName() != null ? criteria.getSurName().trim() : null;
        this.lastName = criteria.getFamilyName() != null ? criteria.getFamilyName().trim() : null;
        if (criteria.getIdentity().length() == 10) {
            this.egn = criteria.getIdentity();
        } else if(criteria.getIdentity().length() == 8) {
            this.dateOfBirth = LocalDate.parse(criteria.getIdentity(), DateTimeFormatter.BASIC_ISO_DATE).format(DateTimeFormatter.ISO_DATE);
        }
        //Portal have to search only active individuals, when set active to 1 that means to search active individuals
        this.active = 1;
    }
}
