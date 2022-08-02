package bg.registryagency.epzeu.pr.integration.bulstat.client.impl;

import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import bg.registryagency.epzeu.pr.integration.bulstat.client.BaseBulstatWebClient;
import bg.registryagency.epzeu.pr.integration.bulstat.client.LegalEntityBulstatWebClient;
import bg.registryagency.epzeu.pr.integration.bulstat.client.SoapNativeWebClient;
import bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice.GetLegalEntityByUIC;
import bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice.GetLegalEntityByUICRequest;
import bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice.GetLegalEntityByUICResponse;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


@Component
public class SubjectServiceBulstatWebClientImpl extends BaseBulstatWebClient implements LegalEntityBulstatWebClient {

    private static final String SUBJECT_SERVICE_ENDPOINT = "SubjectService";

    public SubjectServiceBulstatWebClientImpl(AppParameterCache appParameterCache, SoapNativeWebClient nativeWebClient) {
        super(appParameterCache, nativeWebClient);
    }

    @Override
    public Mono<Object> getLegalEntity(String legalEntityNumber) {
        GetLegalEntityByUICRequest requestData = new GetLegalEntityByUICRequest();
        requestData.setUic(legalEntityNumber);
        GetLegalEntityByUIC legalEntityByUicRequest = new GetLegalEntityByUIC();
        legalEntityByUicRequest.setGetLegalEntityByUICRequest(requestData);

        GetLegalEntityByUICResponse response = (GetLegalEntityByUICResponse) nativeWebClient.callWebService(
                getBulstatApiBaseUrl() + SUBJECT_SERVICE_ENDPOINT,
                legalEntityByUicRequest);

        if(response.getSubject() == null) {
            return Mono.just(new LegalEntityIntegration(null,null));
        }
        return Mono.just(new LegalEntityIntegration(response.getSubject().getLegalEntitySubject().getCyrillicFullName(), legalEntityNumber));
    }
}
