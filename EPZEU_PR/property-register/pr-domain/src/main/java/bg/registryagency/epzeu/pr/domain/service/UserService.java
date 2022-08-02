package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.domain.model.User;

/**
 * Интерфейс на услуга за работа с потребители.
 *
 * {@link User}
 */
public interface UserService {
    /**
     * Осигурява идентификационен номер на потребител за работа със системата.
     * @param user потребителя, за който трябва да се осигури идентификационен номер.
     * @return потребител с идентификационен номер отговарящ на портала на имотен регистър.
     */
    User ensureUser(User user);

    User searchUser(Integer userId, Integer cin);

    void setCurrentUser(Integer userId);
}
