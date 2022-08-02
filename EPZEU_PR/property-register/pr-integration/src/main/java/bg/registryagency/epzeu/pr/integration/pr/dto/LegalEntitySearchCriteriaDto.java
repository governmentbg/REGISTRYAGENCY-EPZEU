package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за търсене на юридическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntitySearchCriteriaDto", description = "Контейнер на данни за търсене на юридическо лице.")
public class LegalEntitySearchCriteriaDto {

    /** Идентификатор на чуждестранно лице. */
    @Schema(name = "foreignLegalEntityIdentifier", description = "Идентификатор на чуждестранно лице.")
    protected String foreignLegalEntityIdentifier;

    /** Идентификатор на Служба по вписванията */
    @Schema(name = "registryOfficeId", description = "Идентификатор на Служба по вписванията.")
    protected String registryOfficeId;

    /** Наименование на Служба по вписванията. */
    @Schema(name = "registryOfficeName", description = "Наименование на Служба по вписванията.")
    protected String registryOfficeName;

    /** Наименование на държава. */
    @Schema(name = "countryName", description = "Наименование на държава.")
    protected String countryName;

    /** Идентификатор на държава. */
    @Schema(name = "countryID", description = "Идентификатор на държава.")
    protected String countryID;

    /** Код на държава. */
    @Schema(name = "countryCode", description = "Код на държава.")
    protected String countryCode;

    /** Код на държава по ISO. */
    @Schema(name = "countryCodeISO", description = "Код на държава по ISO.")
    protected String countryCodeISO;

    /** Идентификатор на фирма (БУЛСТАТ). */
    @Schema(name = "companyIdBulstat", description = "Идентификатор на фирма (БУЛСТАТ).")
    protected String companyIdBulstat;

    /** Съд по регистрация на Фирмено дело. */
    @Schema(name = "companyCaseCourtId", description = "Съд по регистрация на Фирмено дело.")
    protected String companyCaseCourtId;

    /** Година на Фирмено дело. */
    @Schema(name = "companyCaseYear", description = "Година на Фирмено дело.")
    protected String companyCaseYear;

    /** Номер на Фирмено дело. */
    @Schema(name = "companyCaseNumber", description = "Номер на Фирмено дело.")
    protected String companyCaseNumber;

    /** Наименование на фирма. */
    @Schema(name = "companyName", description = "Наименование на фирма.")
    protected String companyName;

    /** Режим на търсене на юридическо лице. */
    @Schema(name = "searchModeForLegalEntity", description = "Режим на търсене на юридическо лице.")
    protected Integer searchModeForLegalEntity;
}
