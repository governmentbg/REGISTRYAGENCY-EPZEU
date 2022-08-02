package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class ApplicationTypeReauNomenclatureCache extends BaseCache<Integer, ApplicationTypeReauNomDto> {

    public ApplicationTypeReauNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
