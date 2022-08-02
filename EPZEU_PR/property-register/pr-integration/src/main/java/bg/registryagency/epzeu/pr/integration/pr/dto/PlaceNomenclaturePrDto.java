package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни на номенклатура на населените места, която включва - населено място(град, село, махала), община, район.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "PlaceNomenclaturePrDto", description = "Контейнер на данни на номенклатура на населените места, която включва - населено място(град, село, махала), община, район.")
public class PlaceNomenclaturePrDto {

    /** Идентификатор на населено място(град, село, махала), община, район.*/
    @Schema(name = "placeId", description = "Идентификатор на населено място(град, село, махала), община, район.")
    private String placeId;

    /** Наименование.*/
    @Schema(name = "name", description = "Наименование.")
    private String name;

    /** Номер по ЕКАТТЕ. */
    @Schema(name = "ekatte", description = "Номер по ЕКАТТЕ.")
    private String ekatte;

    /** Вид населено място(град, село, махала), община, район. */
    @Schema(name = "type", description = "Вид населено място(град, село, махала), община, район.")
    @EqualsAndHashCode.Exclude
    private Type type;

    /** Връзка към населено място(град, село, махала), община, район, в когото се намира даденото населено място.
     * Например градът Х е в община Y. Този идентификатор ще сочи към идентификатора на Общината, в която се намира градът Х.*/
    @Schema(name = "parentId", description = "Връзка към населено място(град, село, махала), община, район, в когото се намира даденото населено място." +
        "Например градът Х е в община Y. Този идентификатор ще сочи към идентификатора на Общината, в която се намира градът Х.")
    private String parentId;

    /** Идентификатор на служба по вписване. */
    @Schema(name = "siteId", description = "Идентификатор на служба по вписване.")
    private String siteId;

    /** Контейнер на данни за населено място, в което се намира даденото населено място. */
    @Schema(name = "placePR", description = "Контейнер на данни за населено място, в което се намира даденото населено място.")
    @EqualsAndHashCode.Exclude
    private PlaceNomenclaturePrDto placePR;

    public PlaceNomenclaturePrDto(String id) {
        this.placeId = id;
    }

    public void setEkatte(Integer ekatte) {
        if(ekatte != null) {
            //Валиден кадастрален идентификатор е с 5 цифри. Когато ни дойде идентификатор, който е с по малко цифри то той се допълва в началото с нули.
            //Пример 84=>00084
            this.ekatte = String.format("%05d", ekatte);
        }
    }

    public enum Type {
        /**Населено място - град, село.*/
        SETTLEMENT,
        /**Община.*/
        MUNICIPALITY,
        /**Област.*/
        AREA
    }
}
