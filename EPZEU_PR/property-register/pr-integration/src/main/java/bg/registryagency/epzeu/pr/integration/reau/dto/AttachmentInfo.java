package bg.registryagency.epzeu.pr.integration.reau.dto;

import bg.registryagency.epzeu.pr.integration.json.DateStringToLocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Контейнер на данни за прикачен документ.
 */
@Getter
@Setter
@Schema(name = "AttachmentInfo", description = "Контейнер на данни за прикачен документ.")
public class AttachmentInfo {

    /** Идентификатор на прикачения файл.*/
    @Schema(name = "downloadIdentifier", description = "Идентификатор на прикачения файл.")
    private String downloadIdentifier;

    /** Наименование на файл. */
    @Schema(name = "fileName", description = "Наименование на файл.")
    private String fileName;

    /** Идентификатор на тип на файл. */
    @Schema(name = "fileTypeID", description = "Идентификатор на тип на файл.")
    private String fileTypeID;

    /** Дата на създаване. */
    @Schema(name = "createDate", description = "Дата на създаване.")
    @JsonDeserialize(using = DateStringToLocalDateTimeDeserializer.class)
    private LocalDateTime createDate;

    /** Вид */
    @Schema(name = "type", description = "Вид")
    private AttachmentType type;

    public AttachmentInfo() {
        type = AttachmentType.FILE;
    }

    public AttachmentInfo(AttachmentType type, LocalDateTime createDate) {
        this.type = type;
        this.createDate = createDate;
    }

    public enum AttachmentType {
        FILE, JUDGE_RESOLUTION_TEXT, REMARK_TEXT;
    }
}
