package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Клас капсулиращ данни за подписващ участващ в процеса по подисване.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "SignerPersonDto", description = "Клас капсулиращ данни за подписващ участващ в процеса по подисване.")
public class SignerPersonDto {

    /** Име на подписващ. */
    @Schema(name = "name", description = "Име на подписващ.")
    private String name;

    /** Идентификатор на подписващ. */
    @Schema(name = "ident", description = "Идентификатор на подписващ.")
    private String ident;

    /** Ред на полагане на подписа.*/
    @Schema(name = "order", description = "Ред на полагане на подписа.")
    private int order;

    public SignerPersonDto(String name, String ident, int order) {
        this.name = name;
        this.ident = ident;
        this.order = order;
    }
}
