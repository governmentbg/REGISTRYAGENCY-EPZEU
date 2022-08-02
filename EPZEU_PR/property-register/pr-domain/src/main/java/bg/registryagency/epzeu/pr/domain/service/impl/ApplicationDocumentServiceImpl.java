package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.application.util.FileUtils;
import bg.registryagency.epzeu.pr.domain.exception.NotAllowedFileException;
import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.repository.ApplicationDocumentRepository;
import bg.registryagency.epzeu.pr.domain.service.ApplicationDocumentService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.service.ApplicationConfigService;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationDocumentFileWebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.detect.Detector;
import org.apache.tika.io.TikaInputStream;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

/**
 * Реализация на интерфейс ApplicationDocumentService за работа с прикачени документи.
 */
@Service
@Slf4j
public class ApplicationDocumentServiceImpl implements ApplicationDocumentService {
    private final ApplicationDocumentRepository applicationDocumentRepository;
    private final ApplicationDocumentFileWebClient applicationDocumentFileWebClient;
    private final AppParameterCache appParameterCache;
    private final TikaConfig tikaConfig;
    private final ObjectMapper objectMapper;
    private final ApplicationConfigService applicationConfigService;

    public ApplicationDocumentServiceImpl(ApplicationDocumentRepository applicationDocumentRepository,
                                          ApplicationDocumentFileWebClient applicationDocumentFileWebClient,
                                          AppParameterCache appParameterCache, ObjectMapper objectMapper,
                                          ApplicationConfigService applicationConfigService) {
        this.applicationDocumentRepository = applicationDocumentRepository;
        this.applicationDocumentFileWebClient = applicationDocumentFileWebClient;
        this.appParameterCache = appParameterCache;
        this.objectMapper = objectMapper;
        this.tikaConfig = TikaConfig.getDefaultConfig();
        this.applicationConfigService = applicationConfigService;
    }

    @Override
    @Transactional(readOnly = true)
    public Result<ApplicationDocument> search(SearchCriteria.ApplicationDocumentSearchCriteria applicationDocumentSearchCriteria) {
        return applicationDocumentRepository.search(applicationDocumentSearchCriteria);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ApplicationDocument create(ApplicationDocument applicationDocument, MultipartFile file) throws IOException {
        validateFile(file);

        UUID uuid = applicationDocumentFileWebClient.upload(file.getResource(), file.getOriginalFilename())
            .doOnSuccess(aVoid -> {
                if(log.isDebugEnabled()) {
                    log.debug("File successfully uploaded: " + file.getOriginalFilename());
                }
            })
            .doOnError(error -> log.error("Problem occurred during uploading of file with fileName:" + file.getOriginalFilename()))
            .block().getDocIdentifier();

        applicationDocument.setBackofficeGuid(uuid);

        return applicationDocumentRepository.create(applicationDocument);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ApplicationDocument create(ApplicationDocument applicationDocument) {
        return applicationDocumentRepository.create(applicationDocument);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(ApplicationDocument applicationDocument) {
        applicationDocumentRepository.update(applicationDocument);
    }

    @Override
    public void validateFile(MultipartFile file) throws IOException {

        AppParameter maxFileSizeParameter = appParameterCache.get(AppParameterKey.GL_DOCUMENT_MAX_FILE_SIZE);

        long maxAllowedFileSizeInKB = maxFileSizeParameter.getValueInt();
        long sizeInKb = DataSize.ofBytes(file.getSize()).toKilobytes();

        if(file.getSize() == 0) {
            throw new NotAllowedFileException("GL_UPLOAD_FILE_E",
                sizeInKb,
                maxAllowedFileSizeInKB,
                "Cannot upload empty file with size:" + sizeInKb);
        }

        if (sizeInKb > maxAllowedFileSizeInKB) {
            throw new NotAllowedFileException("GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E",
                sizeInKb,
                maxAllowedFileSizeInKB,
                "Not allowed size(kb):" + sizeInKb + ", max allowed size is:" + maxAllowedFileSizeInKB);
        }

        AppParameter allowedExtensionsParameter = appParameterCache.get(AppParameterKey.GL_DOCUMENT_ALLOWED_FORMATS);

        ArrayNode allowedExtensionsArrayNode = (ArrayNode)objectMapper.readTree(allowedExtensionsParameter.getValueString());

        boolean isValidContentType = false;

        String fileExtension = FileUtils.getFileExtensionFromFileName(file.getOriginalFilename());

        for (JsonNode allowedExtension : allowedExtensionsArrayNode) {
            if(allowedExtension.get("extension").asText().toLowerCase().equals(fileExtension.toLowerCase())) {
                String detectedContentType = detectContentType(file.getInputStream(), null);
                //When detected content type has tika in name that means we need better detection by passing filename
                //Do not pass filename at the first detection because if zip file is with extension docx tika do not recognize that this is zip but returns docx content type.
                //If filename is not passed it detects that file is zip. Best detection is to not pass filename and pass it only if content type is contains tika in it.
                if(detectedContentType.contains("tika")) {
                    detectedContentType = detectContentType(file.getInputStream(), file.getOriginalFilename());
                }
                ArrayNode mimeTypes = (ArrayNode) allowedExtension.get("mimeTypes");

                for (JsonNode mimeType : mimeTypes) {
                    if(mimeType.asText().equals(detectedContentType)) {
                        isValidContentType = true;

                        break;
                    }
                }

                break;
            }
        }

        if(!isValidContentType) {
            String acceptedFileExtensions = applicationConfigService.prepareAcceptedFiles(allowedExtensionsParameter.getValueString());
            throw new NotAllowedFileException("GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E",
                acceptedFileExtensions,
                "Not allowed file extension:" + fileExtension + ", allowed extensions:" + acceptedFileExtensions);
        }
    }

    private String detectContentType(InputStream inputStream, String fileName) throws IOException {
        try(TikaInputStream stream = TikaInputStream.get(inputStream)) {
            Detector detector = tikaConfig.getDetector();

            Metadata metadata = new Metadata();
            metadata.add(Metadata.RESOURCE_NAME_KEY, fileName);
            MediaType mediaType = detector.detect(stream, metadata);

            return mediaType.toString();
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(UUID uuid, boolean deleteExternalContent) {
        if(deleteExternalContent) {
            applicationDocumentFileWebClient.delete(uuid)
                .doOnSuccess(aVoid -> {
                    if(log.isDebugEnabled()) {
                        log.debug("Attached document was successfully deleted: " + uuid);
                    }
                }).doOnError(error -> log.error("Problem occurred during deletion of file with uuid: " + uuid)).block();
        }

        applicationDocumentRepository.deleteByUUID(uuid);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(UUID uuid) {
        applicationDocumentRepository.deleteByUUID(uuid);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteAll(List<ApplicationDocument> applicationDocuments, boolean deleteExternalContent) {
        applicationDocuments.forEach(appDocument -> this.delete(appDocument.getBackofficeGuid(), deleteExternalContent));
    }

    /**
     * Reactive downloading of Application Document File
     *
     * @param uuid unique identifier of document file
     * @return ClientResponse for giving possibility of upgrading of response. For example it is possible to add header(Content-Disposition)
     * or other information which will be useful for caller.
     */
    @Override
    public Mono<ClientResponse> download(String uuid) {
        return applicationDocumentFileWebClient.download(uuid);
    }
}
