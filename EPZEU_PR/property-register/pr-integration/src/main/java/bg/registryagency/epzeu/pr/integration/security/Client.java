package bg.registryagency.epzeu.pr.integration.security;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Client {
    /** <div class="bg">КИН(Клиентски идентификационен номер) на потребител.</div> */
    private Integer cin;

    public Client(Integer cin) {
        this.cin = cin;
    }
}
