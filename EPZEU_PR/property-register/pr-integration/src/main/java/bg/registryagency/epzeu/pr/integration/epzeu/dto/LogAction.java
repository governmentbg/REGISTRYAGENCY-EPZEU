package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.ActionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за одитен запис.
 */
@Getter
@Setter
@Schema(name = "LogAction", description = "Контейнер на данни за одитен запис.")
public class LogAction {
    public final static int OBJECT_TYPE_ID = 1;//EAU_APPLICATION - заявление за ЕАУ
    public final static int FUNCTIONALITY_ID = 2;//Заявления

    /** Идентификатор на одитен запис. */
    @Schema(name = "logActionID", description = "Идентификатор на одитен запис.")
    private Long logActionID;

    /** Вид на действието. */
    @Schema(name = "actionType", description = "Вид на действието.")
    private ActionType actionType;

    /** Ключ на одитен запис. */
    @Schema(name = "key", description = "Ключ на одитен запис.")
    private String key;

    /** Идентификатор на потребителска сесия. */
    @Schema(name = "userSessionID", description = "Идентификатор на потребителска сесия.")
    private String userSessionID;

    /** Идентификатор на логин сесия. */
    @Schema(name = "loginSessionID", description = "Идентификатор на логин сесия.")
    private String loginSessionID;

    /** IP адрес. */
    @Schema(name = "ipAddress", description = "IP адрес.")
    private String ipAddress;

    /** Допълнителна информация. */
    @Schema(name = "additionalData", description = "Допълнителна информация.")
    private Object additionalData;

    /** КИН на потреител. */
    @Schema(name = "userCIN", description = "КИН на потреител.")
    private Integer userCIN;

    /** Идентификатор на операция. */
    @Schema(name = "operationID", description = "Идентификатор на операция.")
    private String operationID;

    //Getter for JSON serialization
    public int getObjectType() {
        return OBJECT_TYPE_ID;
    }
    //Getter for JSON serialization
    public int getModule() {
        return ApplicationConstants.MODULE_ID;
    }
    //Getter for JSON serialization
    public int getFunctionality() {
        return FUNCTIONALITY_ID;
    }
}
