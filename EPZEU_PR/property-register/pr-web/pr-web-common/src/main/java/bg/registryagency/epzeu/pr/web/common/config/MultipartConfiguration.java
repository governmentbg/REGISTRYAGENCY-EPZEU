package bg.registryagency.epzeu.pr.web.common.config;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;


@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(MultipartProperties.class)
public class MultipartConfiguration {

    private final MultipartProperties multipartProperties;
    private final AppParameterCache appParameterCache;

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigElement multipartConfigElement = multipartProperties.createMultipartConfig();
        return new UpdatableMultipartConfigElement(multipartConfigElement.getLocation(), multipartConfigElement.getMaxFileSize(),
            multipartConfigElement.getMaxRequestSize(), multipartConfigElement.getFileSizeThreshold());
    }

    public class UpdatableMultipartConfigElement extends MultipartConfigElement {

        private static final long DEFAULT_MAX_SIZE_KB = 10000;
        private volatile long maxFileSize = -1;

        public UpdatableMultipartConfigElement(String location, long maxFileSize, long maxRequestSize, int fileSizeThreshold) {
            super(location, maxFileSize, maxRequestSize, fileSizeThreshold);
        }

        @Override
        public long getMaxFileSize() {
            return getMaxSize();
        }

        @Override
        public long getMaxRequestSize() {
            return getMaxSize() + DataSize.ofKilobytes(DEFAULT_MAX_SIZE_KB).toBytes();
        }

        private long getMaxSize() {
            AppParameter maxFileSizeCache = appParameterCache.get(AppParameterKey.GL_DOCUMENT_MAX_FILE_SIZE);
            if (maxFileSizeCache != null) {
                this.maxFileSize = maxFileSizeCache.getValueInt();
            }

            return (maxFileSize == -1) ? DataSize.ofKilobytes(DEFAULT_MAX_SIZE_KB).toBytes()
                                       : DataSize.ofKilobytes(maxFileSize).toBytes();
        }
    }
}
