package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


/**
 * Контейнер на данни за страница от системата за управление на съдържанието.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "CmsPageDto", description = "Контейнер на данни за страница от системата за управление на съдържанието.")
public class CmsPageDto {

    /**  */
    @Schema(name = "pageId", description = "")
    @JsonAlias("pageID")
    private Integer pageId;

    /**  */
    @Schema(name = "registerId", description = "")
    @JsonAlias("registerID")
    private Short registerId;

    /**  */
    @Schema(name = "title", description = "")
    private String title;

    /**  */
    @Schema(name = "type", description = "")
    private Short type;

    /**  */
    @Schema(name = "applicationTypeId", description = "")
    @JsonAlias("applicationID")
    private Integer applicationTypeId;

    /**  */
    @Schema(name = "serviceId", description = "")
    @JsonAlias("serviceID")
    private Integer serviceId;

    /**  */
    @Schema(name = "parentId", description = "")
    @JsonAlias("parentID")
    private Integer parentId;

    /**  */
    @Schema(name = "orderNum", description = "")
    private Integer orderNum;

    /**  */
    @Schema(name = "isGroup", description = "")
    private Boolean isGroup;
}
