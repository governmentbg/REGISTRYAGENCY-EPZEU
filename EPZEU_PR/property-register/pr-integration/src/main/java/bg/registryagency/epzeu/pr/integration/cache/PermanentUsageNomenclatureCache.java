package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.PermanentUsageDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class PermanentUsageNomenclatureCache extends BaseCache<String, PermanentUsageDto> {

    PermanentUsageNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
