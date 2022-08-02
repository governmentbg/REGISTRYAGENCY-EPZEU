package bg.registryagency.epzeu.pr.web.api.config;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.web.api.filter.CachingHttpHeadersFilter;
import bg.registryagency.epzeu.pr.web.api.i18n.LanguageInterceptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory;
import org.springframework.boot.web.server.MimeMappings;
import org.springframework.boot.web.server.WebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.core.io.Resource;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.http.MediaType;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.resource.*;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.EnumSet;
import java.util.Locale;

/**
 * Configuration of web application with Servlet 3.0 APIs.
 */
@Configuration
@Slf4j
@RequiredArgsConstructor
public class WebConfigurer implements ServletContextInitializer, WebServerFactoryCustomizer, WebMvcConfigurer {
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
        // useless check statement
        //if (env.getActiveProfiles().length == 1) {
        if (log.isInfoEnabled()) {
            log.info("Configuring the Web application, selected profile(s): {}", (Object[]) env.getActiveProfiles());
        }
        //}
        if (env.acceptsProfiles(Profiles.of(ApplicationConstants.SPRING_PROFILE_PRODUCTION))) {
            EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ASYNC);
            initCachingHttpHeadersFilter(servletContext, dispatcherTypes);
        }
        if(log.isInfoEnabled()) {
            log.info("Web application fully configured.");
        }
    }

//    @Bean
//    public TomcatServletWebServerFactory servletContainerFactory() {
//        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
//
//        factory.addConnectorCustomizers(connector ->
//            ((AbstractProtocol) connector.getProtocolHandler()).setProperty("maxKeepAliveRequests", "1"));
//
//        // configure some more properties
//
//        return factory;
//    }

    /**
     * Customize the Servlet engine: Mime types, the document root, the cache.
     */
    @Override
    public void customize(WebServerFactory server) {
        setMimeMappings(server);
        // When running in an IDE or with ./mvnw spring-boot:run, set location of the static web assets.
//        setLocationForStaticAssets(server);

        /*
         * Enable HTTP/2 for Undertow
         * HTTP/2 requires HTTPS, so HTTP requests will fallback to HTTP/1.1.
         */
        // Uncomment below if you want to enable HTTP2 with undertow container
//        if (applicationProperties.getHttp().getVersion().equals(ApplicationApiProperties.Http.Version.V_2_0) &&
//            server instanceof UndertowServletWebServerFactory) {
//
//            ((UndertowServletWebServerFactory) server)
//                .addBuilderCustomizers(builder ->
//                    builder.setServerOption(UndertowOptions.ENABLE_HTTP2, true));
//        }
    }

    private void setMimeMappings(WebServerFactory server) {
        if (server instanceof UndertowServletWebServerFactory) {
            MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
            // Mapping for html is needed for IE
            mappings.add("html", MediaType.TEXT_HTML_VALUE + ";charset=" + StandardCharsets.UTF_8);
            // CloudFoundry issue, see https://github.com/cloudfoundry/gorouter/issues/64
            mappings.add("json", MediaType.TEXT_HTML_VALUE + ";charset=" + StandardCharsets.UTF_8);
            UndertowServletWebServerFactory undertow = (UndertowServletWebServerFactory) server;
            undertow.setMimeMappings(mappings);
        }
    }

//
//    private void setLocationForStaticAssets(WebServerFactory server) {
//        if (server instanceof UndertowServletWebServerFactory) {
//            UndertowServletWebServerFactory undertow = (UndertowServletWebServerFactory) server;
//            File root;
//            String prefixPath = resolvePathPrefix();
//            root = new File(prefixPath + "target/www/");
//            if (root.exists() && root.isDirectory()) {
//                undertow.setDocumentRoot(root);
//            }
//        }
//    }

//    /**
//     * Resolve path prefix to static resources.
//     */
//    private String resolvePathPrefix() {
//        String fullExecutablePath = this.getClass().getResource("").getPath();
//        String rootPath = Paths.get(".").toUri().normalize().getPath();
//        String extractedPath = fullExecutablePath.replace(rootPath, "");
//        int extractionEndIndex = extractedPath.indexOf("target/");
//        if (extractionEndIndex <= 0) {
//            return "";
//        }
//        return extractedPath.substring(0, extractionEndIndex);
//    }

    /**
     * Initializes the caching HTTP Headers Filter.
     */
    private void initCachingHttpHeadersFilter(ServletContext servletContext,
                                              EnumSet<DispatcherType> disps) {
        if(log.isDebugEnabled()) {
            log.debug("Registering Caching HTTP Headers Filter");
        }

        FilterRegistration.Dynamic cachingHttpHeadersFilter =
            servletContext.addFilter("cachingHttpHeadersFilter",
                new CachingHttpHeadersFilter(applicationProperties));

        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/app/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/css/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/fonts/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/images/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/js/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/identity/*");
        cachingHttpHeadersFilter.setAsyncSupported(true);
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

    @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver localeResolver = new CookieLocaleResolver();
        localeResolver.setCookieName(ApplicationConstants.LANGUAGE_COOKIE_NAME);
        localeResolver.setDefaultLocale(new Locale(ApplicationConstants.LANGUAGE_DEFAULT));
        return localeResolver;
    }

    @Bean
    public LanguageInterceptor languageInterceptor() {
        return new LanguageInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(languageInterceptor());
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
