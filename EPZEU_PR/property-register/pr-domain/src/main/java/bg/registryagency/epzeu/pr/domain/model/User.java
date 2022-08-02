package bg.registryagency.epzeu.pr.domain.model;

import bg.registryagency.epzeu.pr.integration.security.Client;
import lombok.*;

/**
 * <div class="bg">Модел на потребител.</div>
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@ToString
public class User extends Client {
    //User is not final because id is generated after creation of user
    /** <div class="bg">Идентификатор на потребител.</div> */
    @Setter private Integer userId;
    /** <div class="bg">Име на потребител, което ще се визуализира в системата.</div> */
    private String displayName;
    /** <div class="bg">Флаг указващ дали потребителя е системен.</div> */
    private Boolean isSystem;

    /**
     * <div class="bg">Конструктор за създаване на User само с userId.</div>
     * @param userId <div class="bg">Идентификационен номер на потребителя</div>
     */
    public User(Integer userId) {
        this.userId = userId;
        this.displayName = null;
        this.isSystem = null;
    }

    public User(int cin, String displayName, boolean isSystem) {
        super(cin);

        this.displayName = displayName;
        this.isSystem = isSystem;
    }

    public static User getSystemUser() {
        User user = new User(1, "", true);
        user.setUserId(1);

        return user;
    }
}
