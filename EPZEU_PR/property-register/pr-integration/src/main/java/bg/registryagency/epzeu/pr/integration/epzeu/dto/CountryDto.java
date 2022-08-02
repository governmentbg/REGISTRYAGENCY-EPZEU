package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за държава.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "CountryDto", description = "Контейнер на данни за държава.")
public class CountryDto {
    //ISO_3166-1

    /** Код по ISO3166. */
    @Schema(name = "code_ISO3166", description = "Код по ISO3166.")
    @JsonProperty("code_ISO3166")
    private Short code;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    public CountryDto(Short code) {
        this.code = code;
    }
}
