package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.pr.dto.ActDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class ActNomenclatureCache extends BaseCache<String, Set<ActDto>> {

    ActNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
