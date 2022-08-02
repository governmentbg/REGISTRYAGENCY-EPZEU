package bg.registryagency.epzeu.pr.integration.cr.dto;

import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за юридическо лице в търговски регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntityCR", description = "Контейнер на данни за юридическо лице в търговски регистър.")
public class LegalEntityCR {

    /** Уникален идентификационен код. */
    @Schema(name = "uic", description = "Уникален идентификационен код.")
    private String uic;

    /** Наименование на фирма. */
    @Schema(name = "companyName", description = "Наименование на фирма.")
    private String companyName;

    /** Пълно наименование на фирма. */
    @Schema(name = "companyFullName", description = "Пълно наименование на фирма.")
    private String companyFullName;

    /** Правна форма. */
    @Schema(name = "legalForm", description = "Правна форма.")
    private Integer legalForm;

    /** Статус */
    @Schema(name = "status", description = "Статус")
    private Integer status;

    /** Флаг, указващ дали има фирмено дело. */
    @Schema(name = "hasCompanyCases", description = "Флаг, указващ дали има фирмено дело.")
    private Boolean hasCompanyCases;

    /** Номер на съд. */
    @Schema(name = "courtNumber", description = "Номер на съд.")
    private Integer courtNumber;

    /** Номер на фирмено дело. */
    @Schema(name = "caseNumber", description = "Номер на фирмено дело.")
    private Integer caseNumber;

    /** Година на фирмено дело. */
    @Schema(name = "caseYear", description = "Година на фирмено дело.")
    private String caseYear;

    /** Дата на създаване на записа. */
    @Schema(name = "createdOn", description = "Дата на създаване на записа.")
    private String createdOn;

    /** TODO */
    @Schema(name = "companyNameSuffixFlag", description = "")
    private Boolean companyNameSuffixFlag;

    /** TODO */
    @Schema(name = "elementHolderAdditionFlag", description = "")
    private Boolean elementHolderAdditionFlag;

    public LegalEntityIntegration asLegalEntityIntegration() {
        LegalEntityIntegration legalEntityIntegration = new LegalEntityIntegration();
        legalEntityIntegration.setCompanyName(this.getCompanyFullName());
        return legalEntityIntegration;
    }
}
