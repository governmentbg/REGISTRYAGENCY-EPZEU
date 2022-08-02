package bg.registryagency.epzeu.pr.domain.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <div class="bg">Модел на операция.</div>
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Operation {
    private Long serviceOperationId;
    private String operationId;

    private Operation.Type type;
    private boolean isCompleted;
    private String result;
    private String nextOperation;

    public enum Type {
        APPLICATION_ACCEPTANCE
    }
}
