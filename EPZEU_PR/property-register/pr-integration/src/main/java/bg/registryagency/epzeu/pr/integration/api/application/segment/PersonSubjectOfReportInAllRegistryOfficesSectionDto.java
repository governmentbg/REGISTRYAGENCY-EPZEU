package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.PeriodForReportDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за лице, обект на справка във всички служби по вписванията.
 */
@Getter
@Setter
@Schema(name = "PersonSubjectOfReportInAllRegistryOfficesSectionDto", description = "Контейнер на данни за лице, обект на справка във всички служби по вписванията.")
public class PersonSubjectOfReportInAllRegistryOfficesSectionDto {

    /** Период на справката. */
    @Schema(name = "periodForReport", description = "Период на справката.")
    protected PeriodForReportDto periodForReport;

    /** Тип на лицето (Физическо / Юридическо). */
    @Schema(name = "personType", description = "Тип на лицето (Физическо / Юридическо).")
    protected Integer personType;

    /** Идентификатор на лицето (ЕГН / ЛНЧ / БУЛСТАТ). */
    @Schema(name = "identity", description = "Идентификатор на лицето (ЕГН / ЛНЧ / БУЛСТАТ).")
    protected String identity;

    /** Идентификатор на Юридическо лице. */
    @Schema(name = "legalEntityNumber", description = "Идентификатор на Юридическо лице.")
    protected String legalEntityNumber;

    /** Наименование на фирма. */
    @Schema(name = "companyName", description = "Наименование на фирма.")
    protected String companyName;

    public PersonSubjectOfReportInAllRegistryOfficesSectionDto() {
        this(true);
    }

    public PersonSubjectOfReportInAllRegistryOfficesSectionDto(boolean createAll) {
        if(createAll) {
            this.periodForReport = new PeriodForReportDto();
        }
    }
}
