package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за заявка за търсене на електронна партида.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AccountPropertySearchRequest", description = "Контейнер на данни за заявка за търсене на електронна партида.")
public class AccountPropertySearchRequest {

    /** Идентификатор на служба */
    @Schema(name = "siteId", description = "Идентификатор на служба")
    protected String siteId;

    /** Номер на електронна партида */
    @Schema(name = "lotNumber", description = "Номер на електронна партида")
    protected String lotNumber;

    /** Кадастрален идентификатор */
    @Schema(name = "cadastreNumber", description = "Кадастрален идентификатор")
    protected String cadastreNumber;

    public AccountPropertySearchRequest(AccountPropertySearchCriteriaDto criteria) {
        this.siteId = criteria.getRegistryOfficeId();
        this.lotNumber = criteria.getAccountNumber();
        this.cadastreNumber = criteria.getCadastralIdentifier();
    }
}
