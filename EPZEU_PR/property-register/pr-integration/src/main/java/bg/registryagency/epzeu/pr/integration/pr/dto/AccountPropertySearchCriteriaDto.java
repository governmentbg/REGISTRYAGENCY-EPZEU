package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на критерии за търсене на електронна партида.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AccountPropertySearchCriteriaDto", description = "Контейнер на критерии за търсене на електронна партида.")
public class AccountPropertySearchCriteriaDto {

    /** Идентификатор на служба */
    @Schema(name = "registryOfficeId", description = "Идентификатор на служба.")
    protected String registryOfficeId;

    /** Име на служба. */
    @Schema(name = "registryOfficeName", description = "Име на служба.")
    protected String registryOfficeName;

    /** Номер на електронна партида. */
    @Schema(name = "accountNumber", description = "Номер на електронна партида.")
    protected String accountNumber;

    /** Кадастрален идентификатор. */
    @Schema(name = "cadastralIdentifier", description = "Кадастрален идентификатор.")
    protected String cadastralIdentifier;
}
