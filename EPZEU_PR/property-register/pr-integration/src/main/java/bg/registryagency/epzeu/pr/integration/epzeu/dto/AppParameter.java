package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import bg.registryagency.epzeu.pr.integration.json.DateStringToLocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.xml.datatype.Duration;
import java.time.LocalDateTime;


/**
 * Контейнер на данни за конфигурационен параметър в приложението.
 */
@Getter
@Setter
@Schema(name = "AppParameter", description = "Контейнер на данни за конфигурационен параметър в приложението.")
public class AppParameter {

    /** Идентификатор на конфигурационен параметър. */
    @Schema(name = "appParamID", description = "Идентификатор на конфигурационен параметър.")
    private Long appParamID;

    /** Идентификатор на функционалност. */
    @Schema(name = "functionalityID", description = "Идентификатор на функционалност.")
    private Long functionalityID;

    /** Код на пораметъра.*/
    @Schema(name = "code", description = "Код на пораметъра.")
    private String code;

    /** Описание */
    @Schema(name = "description", description = "Описание")
    private String description;

    /** Флаг, указващ дали параметъра е системен. */
    @Schema(name = "isSystem", description = "Флаг, указващ дали параметъра е системен.")
    private Boolean isSystem;

    /** Тип на параметъра */
    @Schema(name = "parameterType", description = "Тип на параметъра")
    private Integer parameterType;

    //One of these values are possible for parameter

    /** Стойност на параметъра като число. */
    @Schema(name = "valueInt", description = "Стойност на параметъра като число.")
    private Integer valueInt;

    /** Стойност на параметъра като текст. */
    @Schema(name = "valueString", description = "Стойност на параметъра като текст.")
    private String valueString;

    /** Стойност на параметъра като дата. */
    @Schema(name = "valueDateTime", description = "Стойност на параметъра като дата.")
    @JsonDeserialize(using = DateStringToLocalDateTimeDeserializer.class)
    private LocalDateTime valueDateTime;

    /** Стойност на параметъра като интервал от време. */
    @Schema(name = "valueInterval", description = "Стойност на параметъра като интервал от време.")
    private Duration valueInterval;

    public long getSecondsFromInterval() {
        int minutes = valueInterval.getMinutes();
        int seconds = valueInterval.getSeconds();

        return (minutes*60) + seconds;
    }
}
