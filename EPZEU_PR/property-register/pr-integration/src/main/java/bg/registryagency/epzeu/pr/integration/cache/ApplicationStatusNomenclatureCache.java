package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStatusNomenclatureCache extends BaseCache<Integer, ApplicationStatusNomDto> {

    public ApplicationStatusNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
