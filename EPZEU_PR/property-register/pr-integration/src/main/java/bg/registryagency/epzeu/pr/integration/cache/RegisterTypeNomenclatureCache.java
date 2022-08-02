package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegisterTypeDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

@Component
public class RegisterTypeNomenclatureCache extends BaseCache<String, RegisterTypeDto> {

    public RegisterTypeNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
