package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.repository.UserRepository;
import bg.registryagency.epzeu.pr.domain.service.UserService;
import bg.registryagency.epzeu.pr.integration.cache.UserCache;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Реализация на интерфейс UserService за работа с потребители на системата.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserCache userCache;

    @Override
    public User ensureUser(User user) {
        User userFromCache = (User) userCache.get(user.getCin());
        //If user is not in a cache then store it in db and in cache for future use
        if(userFromCache == null) {
            user = userRepository.ensureUser(user);

            userCache.put(user.getCin(), user);
            userFromCache = user;
        }

        return userFromCache;
    }

    @Override
    @Transactional(readOnly = true)
    public User searchUser(Integer userId, Integer cin) {
        return userRepository.searchUser(userId, cin);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void setCurrentUser(Integer userId) {
        userRepository.setCurrentUser(userId);
    }
}
