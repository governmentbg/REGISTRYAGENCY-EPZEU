package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.ServiceNomDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class ServiceNomenclatureCache extends BaseCache<Integer, ServiceNomDto> {

    @Getter @Setter
    private String lastUpdatedDate;

    public ServiceNomenclatureCache() {
        super(Caffeine.newBuilder().build());
    }
}
