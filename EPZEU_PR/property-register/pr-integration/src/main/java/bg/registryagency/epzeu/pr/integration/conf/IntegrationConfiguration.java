package bg.registryagency.epzeu.pr.integration.conf;

import bg.registryagency.epzeu.pr.integration.bulstat.client.SoapNativeWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.retry.Retry;

import java.net.MalformedURLException;
import java.net.URL;

@Configuration
@ComponentScan(value = "bg.registryagency.epzeu.pr.integration")
@EnableConfigurationProperties({ApplicationIntegrationProperties.class})
public class IntegrationConfiguration {

    public static final Retry RETRY_ON_SPECIFIC_EXCEPTIONS = Retry
        .anyOf(WebClientResponseException.InternalServerError.class,
            WebClientResponseException.ServiceUnavailable.class,
            WebClientResponseException.NotFound.class,
            WebClientResponseException.BadGateway.class,
            WebClientResponseException.GatewayTimeout.class);

    /* Note ${…} placeholder has value ${key:default}. This declaration instruct Spring to find a property with key named ‘key’ and assign it’s value. In case property ‘key’ not found, assign value ‘default’ */
    @Configuration
    @Profile(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)
    @PropertySource({"classpath:/config/application-integration.properties",
        "classpath:/config/application-integration-${spring.profiles.active:dev}.properties"})
    static class LocalDevelopmentPropertySource {}

    /* Note ${…} placeholder has value ${key:default}. This declaration instruct Spring to find a property with key named ‘key’ and assign it’s value. In case property ‘key’ not found, assign value ‘default’ */
    @Configuration
    @Profile("!" + ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)
    @PropertySource({"file:./config/application-integration.properties",
        "file:./config/application-integration-${spring.profiles.active:dev-vm}.properties"})
    static class ProductionPropertySource {}

    @Bean
    WebClient identityServerNativeWebClient(WebClient.Builder webClientBuilder, @Value("${application.integration.security.is.base-url}") String url) {
//        //Proxy config
//        HttpClient httpClient = HttpClient.create()
//            .tcpConfiguration(tcpClient ->
//                tcpClient.proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP).host("127.0.0.1").port(8081)));
//        ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);
//
//        return WebClient.builder().clientConnector(connector).baseUrl(url).build();

        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient epzeuNativeWebClient(WebClient.Builder webClientBuilder, @Value("${application.integration.epzeu.api-base-url}") String url) {
//        //Proxy config
//        HttpClient httpClient = HttpClient.create()
//            .tcpConfiguration(tcpClient ->
//                tcpClient.proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP).host("127.0.0.1").port(8082)));
//        ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);

//        return WebClient.builder().clientConnector(connector).baseUrl(url).build();
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient publicEpzeuNativeWebClient(WebClient.Builder webClientBuilder, @Value("${application.integration.epzeu.portal-base-url}") String url) {
//        //Proxy config
//        HttpClient httpClient = HttpClient.create()
//            .tcpConfiguration(tcpClient ->
//                tcpClient.proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP).host("127.0.0.1").port(8081)));
//        ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);

//        return WebClient.builder().clientConnector(connector).baseUrl(url).build();
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient propertyRegisterPublicNativeWebClient(WebClient.Builder webClientBuilder, @Value("${" + AppParameterKey.PR_WEB_API + "}") String url) {
        //        //Proxy config
//        HttpClient httpClient = HttpClient.create()
//            .tcpConfiguration(tcpClient ->
//                tcpClient.proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP).host("127.0.0.1").port(8081)));
//        ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);
//
//        return WebClient.builder().clientConnector(connector).build();

        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient propertyRegisterProcessorNativeWebClient(WebClient.Builder webClientBuilder, @Value("${" + AppParameterKey.PR_REGISTER_API + "}") String url) {
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient reauWebClient(WebClient.Builder webClientBuilder, @Value("${" + AppParameterKey.PR_REAU_API + "}") String url) {
        //Proxy config
//        HttpClient httpClient = HttpClient.create()
//            .tcpConfiguration(tcpClient ->
//                tcpClient.proxy(proxy -> proxy.type(ProxyProvider.Proxy.HTTP).host("127.0.0.1").port(8082)));
//        ReactorClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);
//
//        return WebClient.builder().clientConnector(connector).baseUrl(url).build();
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient paymentWebClient(WebClient.Builder webClientBuilder, @Value("${" + AppParameterKey.GL_PAYMENTS_API + "}") String url) {
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    WebClient commercialRegisterWebClient(WebClient.Builder webClientBuilder, @Value("${" + AppParameterKey.CR_REGISTER_API + "}") String url) {
        return webClientBuilder.baseUrl(url).build();
    }

    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setPackagesToScan("bg.registryagency.epzeu.pr.integration.bulstat.dto");
        return marshaller;
    }

    @Bean
    public SoapNativeWebClient soapConnector(Jaxb2Marshaller marshaller) {
        SoapNativeWebClient client = new SoapNativeWebClient();
        client.setMarshaller(marshaller);
        client.setUnmarshaller(marshaller);

        return client;
    }

    @Bean
    ConfigurableJWTProcessor configurableJWTProcessor(ApplicationIntegrationProperties properties) throws MalformedURLException {
        ConfigurableJWTProcessor jwtProcessor = new DefaultJWTProcessor();
        JWKSource keySource = new RemoteJWKSet(new URL(properties.getSecurity().getIs().getJwkUrl()));
        JWSKeySelector keySelector = new JWSVerificationKeySelector(JWSAlgorithm.RS256, keySource);
        jwtProcessor.setJWSKeySelector(keySelector);

        return jwtProcessor;
    }
}
