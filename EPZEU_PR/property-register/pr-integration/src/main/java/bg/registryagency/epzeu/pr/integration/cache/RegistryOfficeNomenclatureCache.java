package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class RegistryOfficeNomenclatureCache extends BaseCache<String, RegistryOfficeDto> {

    public RegistryOfficeNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
