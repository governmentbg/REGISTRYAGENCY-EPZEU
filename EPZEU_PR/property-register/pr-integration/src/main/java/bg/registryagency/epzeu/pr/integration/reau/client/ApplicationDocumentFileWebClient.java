package bg.registryagency.epzeu.pr.integration.reau.client;

import bg.registryagency.epzeu.pr.integration.reau.dto.UploadDocumentResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.UUID;

public interface ApplicationDocumentFileWebClient {

    Mono<UploadDocumentResponse> upload(Resource resource, String originalFilename);

    Mono<ClientResponse> download(String uuid);

    Mono<Void> delete(UUID uuid);
}
