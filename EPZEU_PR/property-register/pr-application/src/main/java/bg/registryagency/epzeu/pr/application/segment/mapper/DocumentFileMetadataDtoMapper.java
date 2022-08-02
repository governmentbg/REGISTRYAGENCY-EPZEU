package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DocumentFileMetadata;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentFileMetadataDto;

public class DocumentFileMetadataDtoMapper {
    public static DocumentFileMetadata asModel(DocumentFileMetadataDto dto) {
        if(dto == null) {
            return null;
        }

        DocumentFileMetadata fileMetadata = new DocumentFileMetadata();
        fileMetadata.setFileName(dto.getFileName());
        fileMetadata.setContentType(dto.getContentType());
        fileMetadata.setSize(dto.getSize());
        fileMetadata.setHashAlgorithm(dto.getHashAlgorithm());
        fileMetadata.setHash(dto.getHash());

        return fileMetadata;
    }

    public static DocumentFileMetadataDto asDto(DocumentFileMetadata fileMetadata) {
        if (fileMetadata == null) {
            return new DocumentFileMetadataDto();
        }

        DocumentFileMetadataDto dto = new DocumentFileMetadataDto();
        dto.setFileName(fileMetadata.getFileName());
        dto.setContentType(fileMetadata.getContentType());
        dto.setSize(fileMetadata.getSize());
        dto.setHashAlgorithm(fileMetadata.getHashAlgorithm());
        dto.setHash(fileMetadata.getHash());

        return dto;
    }
}
