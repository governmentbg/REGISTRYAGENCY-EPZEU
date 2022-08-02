package bg.registryagency.epzeu.pr.integration.cache;

import java.util.concurrent.ConcurrentMap;

public abstract class BaseCache<K, V> implements Cache<K, V> {
    private final com.github.benmanes.caffeine.cache.Cache<K, V> cache;

    private int cacheHash;

    BaseCache(com.github.benmanes.caffeine.cache.Cache<K, V> cache) {
        this.cache = cache;
    }

    @Override
    public V get(K key) {
        return this.cache.getIfPresent(key);
    }

    @Override
    public void put(K key, V object) {
        this.cache.put(key, object);
    }

    public ConcurrentMap<K, V> asMap() {
        return this.cache.asMap();
    }

    public int getCacheHash() {
        if(this.cacheHash == 0) {
            this.cacheHash = this.calculateCacheHash();
        }
        return this.cacheHash;
    }

    public int calculateCacheHash() {
        this.cacheHash = this.cache.asMap().hashCode();
        return this.cacheHash;
    }
}
