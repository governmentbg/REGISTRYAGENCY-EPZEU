package bg.registryagency.epzeu.pr.domain.repository.impl;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.repository.UserRepository;
import bg.registryagency.epzeu.pr.domain.repository.sp.user.AppUserEnsureSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.user.AppUsersSearchSP;
import bg.registryagency.epzeu.pr.domain.repository.sp.user.CurrentUserSetSP;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

/**
 * Реализация на интерфейс UserRepository за поддържане и съхранение на обекти от тип User.
 */
@Repository
@Slf4j
public class UserRepositoryImpl implements UserRepository {
    private final CurrentUserSetSP currentUserSetSP;
    private final AppUserEnsureSP appUserEnsureSP;
    private final AppUsersSearchSP appUsersSearchSP;

    public UserRepositoryImpl(DataSource dataSource) {
        this.currentUserSetSP = new CurrentUserSetSP(dataSource);
        this.appUserEnsureSP = new AppUserEnsureSP(dataSource);
        this.appUsersSearchSP = new AppUsersSearchSP(dataSource);
    }

    @Override
    public void setCurrentUser(Integer userId) {
        currentUserSetSP.execute(userId);
    }

    @Override
    public User ensureUser(User user) {
        user.setUserId(appUserEnsureSP.execute(user));

        return user;
    }

    @Override
    public User searchUser(Integer userId, Integer cin) {
        return appUsersSearchSP.execute(userId, cin);
    }
}
