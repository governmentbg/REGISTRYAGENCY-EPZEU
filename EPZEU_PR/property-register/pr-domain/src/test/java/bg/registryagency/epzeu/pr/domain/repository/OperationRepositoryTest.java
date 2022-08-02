package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.domain.conf.DomainRepositoryTestConfiguration;
import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomainRepositoryTestConfiguration.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
@Transactional
public class OperationRepositoryTest {
    @Autowired
    private OperationRepository operationRepository;

    @Test
    public void testCreate() {
        //Create Operation
        Operation operation = operationRepository
            .create(BootstrapDataUtils.createOperation());

        createOperation(operation);
    }

    //TODO update all tests there is changes to model and db and test have to be updated
    @Test
    public void testUpdate() {
        String nextOperation = "NextOperation";

        Operation operation = operationRepository
            .create(BootstrapDataUtils.createOperation());

        operation = createOperation(operation);
        operation.setCompleted(false);
        operation.setType(Operation.Type.APPLICATION_ACCEPTANCE);
        operation.setNextOperation(nextOperation);

        operationRepository.update(operation);

        operation = createOperation(operation);

        assertThat(operation).isNotNull();
        assertThat(operation.getNextOperation()).isEqualTo(nextOperation);
    }

    @Test
    public void testSearchWithUuid() {
        Operation operation = operationRepository
            .create(BootstrapDataUtils.createOperation());

        operation = createOperation(operation);

        Operation foundOperation = operationRepository.search(SearchCriteria
            .OperationSearchCriteria.builder()
            .operationId(operation.getOperationId())
            .build()).single();

        assertThat(foundOperation).isNotNull();
        assertThat(foundOperation.getOperationId()).isEqualTo(operation.getOperationId());
        assertThat(foundOperation.getOperationId()).isEqualTo(operation.getOperationId());
    }

    private Operation createOperation(Operation operation) {


        assertThat(operation.getOperationId()).isNotNull();

        return operation;
    }
}
