package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DocumentType;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;

public class DocumentTypeDtoMapper {
    public static DocumentType asModel(DocumentTypePrDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        DocumentType documentType = new DocumentType();
        documentType.setId(dto.getId());
        documentType.setName(dto.getName());

        return documentType;
    }

    public static DocumentTypePrDto asDto(DocumentType documentType) {
        if (documentType == null) {
            return new DocumentTypePrDto();
        }

        DocumentTypePrDto dto = new DocumentTypePrDto();
        dto.setId(documentType.getId());
        dto.setName(documentType.getName());

        return dto;
    }
}
