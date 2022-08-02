package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.conf.DomainRepositoryTestConfiguration;
import bg.registryagency.epzeu.pr.domain.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomainRepositoryTestConfiguration.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
@Transactional
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testEnsure() {
        User user = ensureUser();

        assertThat(user.getUserId()).isNotNull();
    }

    @Test
    public void testSearch() {
        User user = ensureUser();
        User user1 = userRepository.searchUser(user.getUserId(), null);
        User user2 = userRepository.searchUser(null, user.getCin());
        User user3 = userRepository.searchUser(user.getUserId(), user.getCin());

        assertThat(user.getUserId())
            .isEqualTo(user1.getUserId())
            .isEqualTo(user2.getUserId())
            .isEqualTo(user3.getUserId());
    }

    private User ensureUser() {
        User user = new User(101010, "Test Testov", false);

        return userRepository.ensureUser(user);
    }
}
