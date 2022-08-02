package bg.registryagency.epzeu.pr.integration.bulstat.client;

import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.transport.http.ClientHttpRequestMessageSender;

import java.util.concurrent.TimeUnit;
//TODO retry
public class SoapNativeWebClient extends WebServiceGatewaySupport {

    private static final long CONNECTION_TIMEOUT_IN_SECONDS = 10;
    private static final long READ_TIMEOUT_IN_SECONDS = 10;

    public SoapNativeWebClient() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout((int)TimeUnit.SECONDS.toMillis(CONNECTION_TIMEOUT_IN_SECONDS));
        requestFactory.setReadTimeout((int)TimeUnit.SECONDS.toMillis(READ_TIMEOUT_IN_SECONDS));
        setMessageSender(new ClientHttpRequestMessageSender(requestFactory));
    }

    public Object callWebService(String url, Object request){
        return getWebServiceTemplate().marshalSendAndReceive(url, request);
    }
}
