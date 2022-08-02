package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.AttachedDocument;
import bg.registryagency.epzeu.pr.application.segment.DocumentFileMetadata;
import bg.registryagency.epzeu.pr.application.segment.DocumentType;
import bg.registryagency.epzeu.pr.integration.api.application.segment.AttachedDocumentDto;

public class AttachedDocumentDtoMapper {

    public static AttachedDocument asModel(AttachedDocumentDto dto) {
        if (dto == null) {
            return null;
        }

        AttachedDocument attachedDocument = new AttachedDocument();
        attachedDocument.setDocumentName(dto.getName());
        attachedDocument.setDocumentUniqueId(dto.getDocumentUniqueId());
        attachedDocument.setDocumentType(new DocumentType());
        attachedDocument.getDocumentType().setId(dto.getDocumentTypeId());
        attachedDocument.getDocumentType().setName(dto.getDocumentTypeName());
        attachedDocument.setDocumentFileMetadata(new DocumentFileMetadata());
        attachedDocument.getDocumentFileMetadata().setContentType(dto.getContentType());
        attachedDocument.getDocumentFileMetadata().setFileName(dto.getFileName());
        attachedDocument.getDocumentFileMetadata().setHash(dto.getHash());
        attachedDocument.getDocumentFileMetadata().setHashAlgorithm(dto.getHashAlgorithm());
        attachedDocument.getDocumentFileMetadata().setSize(dto.getSize());

        return attachedDocument;
    }

    public static AttachedDocumentDto asDto(AttachedDocument attachedDocument) {
        if (attachedDocument == null) {
            return new AttachedDocumentDto();
        }

        AttachedDocumentDto dto = new AttachedDocumentDto();
        dto.setName(attachedDocument.getDocumentName());
        dto.setDocumentUniqueId(attachedDocument.getDocumentUniqueId());
        if (attachedDocument.getDocumentType() != null) {
            dto.setDocumentTypeId(attachedDocument.getDocumentType().getId());
            dto.setDocumentTypeName(attachedDocument.getDocumentType().getName());
        }
        if (attachedDocument.getDocumentFileMetadata() != null) {
            dto.setFileName(attachedDocument.getDocumentFileMetadata().getFileName());
            dto.setContentType(attachedDocument.getDocumentFileMetadata().getContentType());
            dto.setSize(attachedDocument.getDocumentFileMetadata().getSize());
            dto.setHashAlgorithm(attachedDocument.getDocumentFileMetadata().getHashAlgorithm());
            dto.setHash(attachedDocument.getDocumentFileMetadata().getHash());
        }
        return dto;
    }
}
