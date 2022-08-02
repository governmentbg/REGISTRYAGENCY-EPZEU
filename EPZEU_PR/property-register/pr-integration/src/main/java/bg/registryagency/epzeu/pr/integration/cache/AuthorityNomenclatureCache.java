package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AuthorityNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class AuthorityNomenclatureCache extends BaseCache<Integer, AuthorityNomDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public AuthorityNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
