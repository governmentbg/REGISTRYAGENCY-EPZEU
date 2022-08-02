package bg.registryagency.epzeu.pr.web.api.internal.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;

/**
 * Configuration of web application with Servlet 3.0 APIs.
 */
@Configuration
@Slf4j
@RequiredArgsConstructor
public class WebConfigurer implements ServletContextInitializer, WebMvcConfigurer {
    private final Environment env;
    private final ApplicationApiProperties applicationProperties;

    @Value("${springdoc.api-docs.path}")
    private String apiDocsPath;

    @Value("${springdoc.swagger-ui.path}")
    private String swaggerUiPath;

    @Value("${server.servlet.context-path}")
    private String contextServletPath;

    @Override
    public void onStartup(ServletContext servletContext) {
        if (env.getActiveProfiles().length == 1) {
            log.info("Web application configuration, using profile: {}", (Object[]) env.getActiveProfiles());
        }
        if(log.isInfoEnabled()) {
            log.info("Web application fully configured");
        }
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        ApplicationApiProperties.Cors config = applicationProperties.getCors();
        if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
            if(log.isDebugEnabled()) {
                log.debug("Registering CORS filter");
            }
            source.registerCorsConfiguration(config.getPath(), config);
        }
        return new CorsFilter(source);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true);
        registrar.registerFormatters(registry);
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        AntPathMatcher matcher = new AntPathMatcher();
        matcher.setCaseSensitive(false);
        configurer.setPathMatcher(matcher);
    }

    /**
     * Resource handler below is added for removing of petstore openapi doc from swagger-ui webjar.
     * If it is not removed it will be server with static content index.html from swagger-ui webjar and users can open petstore api from swagger.
     */

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**" + swaggerUiPath + "*/*.html")
            .addResourceLocations("classpath:/META-INF/resources/webjars/")
            .resourceChain(false)
            .addResolver(new WebJarsResourceResolver())
            .addResolver(new PathResourceResolver())
            .addTransformer(new IndexPageTransformer());
    }

    public class IndexPageTransformer implements ResourceTransformer {
        @Override
        public Resource transform(HttpServletRequest request, Resource resource,
                                  ResourceTransformerChain transformerChain) throws IOException {
            if (resource.getURL().toString().endsWith("/index.html")) {
                String html = getHtmlContent(resource);
                html = overwritePetStore(html);
                return new TransformedResource(resource, html.getBytes());
            } else {
                return resource;
            }
        }

        private String overwritePetStore(String html) {
            return html.replace("https://petstore.swagger.io/v2/swagger.json",
                contextServletPath + apiDocsPath);
        }
    }

    private String getHtmlContent(Resource resource) {
        try {
            InputStream inputStream = resource.getInputStream();
            java.util.Scanner s = new java.util.Scanner(inputStream).useDelimiter("\\A");
            String content = s.next();
            inputStream.close();
            return content;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
