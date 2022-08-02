package bg.registryagency.epzeu.pr.integration.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.Getter;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class LabelNomenclatureCache {
    private final static String CACHE_NAME = "label-cache";

    private final CaffeineCache caffeineCache;

    @Getter
    private Map<String, String> modificationEtags;

    public LabelNomenclatureCache() {
        this.caffeineCache = new CaffeineCache(CACHE_NAME, Caffeine.newBuilder().build());
        this.modificationEtags = new HashMap<>();
    }

    public String get(String language, String labelCode) {
        Map<String, String> labels = caffeineCache.get(language, Map.class);

        if(labels != null) {
            return labels.get(labelCode);
        }

        return null;
    }

    public void put(String language, String labelCode, String labelValue) {
        Map<String, String> labelsMap = caffeineCache.get(language, Map.class);
        if(labelsMap == null) {
            labelsMap = new HashMap<>();
            caffeineCache.put(language, labelsMap);
        }
        labelsMap.put(labelCode, labelValue);
    }

    public void put(String language, Map<String, String> labelsForLanguage) {
        caffeineCache.put(language, labelsForLanguage);
    }

    public String getModificationEtagForLanguage(String language) {
        return  this.modificationEtags.get(language);
    }

    public void putModificationEtagForLanguage(String language, String modificationEtag) {
        this.modificationEtags.put(language, modificationEtag);
    }
}
