package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AreaDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class EkatteAreaNomenclatureCache extends BaseCache<Integer, AreaDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public EkatteAreaNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
