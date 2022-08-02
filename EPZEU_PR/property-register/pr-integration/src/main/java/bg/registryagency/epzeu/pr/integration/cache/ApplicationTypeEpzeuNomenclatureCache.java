package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.ApplicationTypeEpzeuNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class ApplicationTypeEpzeuNomenclatureCache extends BaseCache<Integer, ApplicationTypeEpzeuNomDto> {

    @Getter @Setter
    private String lastUpdatedDate;

    public ApplicationTypeEpzeuNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
