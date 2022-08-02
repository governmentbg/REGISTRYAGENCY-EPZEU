package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class CountriesCache extends BaseCache<Short, CountryDto> {
    @Getter @Setter
    private String lastUpdatedDate;

    public CountriesCache() {
        super(Caffeine.newBuilder().build());
    }
}
