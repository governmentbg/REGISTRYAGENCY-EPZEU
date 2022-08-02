package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


/**
 * Контейнер на данни за номенклатура вид на заявление в ЕПЗЕУ.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "ApplicationTypeEpzeuNomDto", description = "Контейнер на данни за номенклатура вид на заявление в ЕПЗЕУ.")
public class ApplicationTypeEpzeuNomDto {

    /** Идентификатор на вид на заявление в ЕПЗЕУ. */
    @Schema(name = "applicationTypeID", description = "Идентификатор на тип на заявление в ЕПЗЕУ.")
    @JsonAlias("applicationTypeID")
    private Integer applicationTypeId;

    /** Вид на заявление в ЕПЗЕУ. */
    @Schema(name = "appType", description = "Тип на заявление в ЕПЗЕУ.")
    private Integer appType;

    /** Наименование. */
    @Schema(name = "name", description = "Наименование на типа.")
    private String name;

    /** Регистър на вида заявление. */
    @Schema(name = "registerId", description = "Регистър на вида заявление.")
    @JsonAlias("registerID")
    private Short registerId;

    /** Код на вида заявление. */
    @Schema(name = "appCode", description = "Код на вида заявление.")
    private String appCode;

    /** URL на вида заявление. */
    @Schema(name = "url", description = "URL на вида заявление.")
    @EqualsAndHashCode.Exclude
    private String url;
}
