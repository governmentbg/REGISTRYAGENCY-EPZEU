package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class AppParameterCache extends BaseCache<String, AppParameter> {
    @Getter @Setter
    private String lastUpdatedDate;

    public AppParameterCache() {
        super(Caffeine.newBuilder().build());
    }
}
