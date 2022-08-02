package bg.registryagency.epzeu.pr.domain.model.mapper;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationDocumentDto;

import java.util.UUID;

public class ApplicationDocumentDtoMapper {
    /**
     * Преобразува контейнерът на данни за прикачени документи към бизнес моделът на прикачени документи.
     * @return бизнес моделът на прикачени документи.
     */
    public static ApplicationDocument toModel(ApplicationDocumentDto applicationDocumentDto) {
        if(applicationDocumentDto == null) {
            return null;
        }

        ApplicationDocument applicationDocument = new ApplicationDocument();
        applicationDocument.setApplicationDocumentId(applicationDocumentDto.getApplicationDocumentId());
        applicationDocument.setName(applicationDocumentDto.getName());
        applicationDocument.setBackofficeGuid(applicationDocumentDto.getBackOfficeGuid() == null ? null : UUID.fromString(applicationDocumentDto.getBackOfficeGuid()));
        applicationDocument.setFileSize(applicationDocumentDto.getFileSize());
        applicationDocument.setDocumentTypeId(applicationDocumentDto.getDocumentTypeId());

        return applicationDocument;
    }
    /**
     * Преобразува бизнес моделът на прикачени документи към контейнер на данни за прикачени документи.
     * @return контейнер на данни за прикачени документи.
     */
    public static ApplicationDocumentDto toDto(ApplicationDocument applicationDocument) {
        if(applicationDocument == null) {
            return null;
        }

        ApplicationDocumentDto dto = new ApplicationDocumentDto();
        dto.setApplicationDocumentId(applicationDocument.getApplicationDocumentId());
        dto.setName(applicationDocument.getName());
        dto.setBackOfficeGuid(applicationDocument.getBackofficeGuid() != null ? applicationDocument.getBackofficeGuid().toString() : null);
        dto.setFileSize(applicationDocument.getFileSize());
        dto.setDocumentTypeId(applicationDocument.getDocumentTypeId());

        return dto;
    }
}
