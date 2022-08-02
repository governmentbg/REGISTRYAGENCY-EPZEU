package bg.registryagency.epzeu.pr.integration.cache;

public interface Cache<K, V> {
    V get(K key);
    void put(K key, V object);

}
