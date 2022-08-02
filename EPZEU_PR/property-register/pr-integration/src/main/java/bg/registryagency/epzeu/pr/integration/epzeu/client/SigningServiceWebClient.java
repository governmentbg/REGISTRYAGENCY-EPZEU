package bg.registryagency.epzeu.pr.integration.epzeu.client;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.SigningRequestDto;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface SigningServiceWebClient {

    Mono<UUID> sendDocumentToSign(SigningRequestDto signingRequest, byte[] contentBytes);
}
