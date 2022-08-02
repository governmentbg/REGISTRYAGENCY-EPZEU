package bg.registryagency.epzeu.pr.integration.reau.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * Контейнер на данни на номенклатура на статус на заявление.
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@Schema(name = "ApplicationStatusNomDto", description = "Контейнер на данни на номенклатура на статус на заявление.")
public class ApplicationStatusNomDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private int id;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Идентификатор на регистър, за когото се отнася статуса на заявлението. */
    @Schema(name = "registerId", description = "�?дентификатор на регистър, за когото се отнася статуса на заявлението.")
    private String registerId;

    /** Код помагащ за превода към даден език на статуса. */
    @Schema(name = "infoTextCode", description = "Код помагащ за превода към даден език на статуса.")
    private String infoTextCode;

    /** Код на статуса. */
    @Schema(name = "nameCode", description = "Код на статуса.")
    private String nameCode;
}
