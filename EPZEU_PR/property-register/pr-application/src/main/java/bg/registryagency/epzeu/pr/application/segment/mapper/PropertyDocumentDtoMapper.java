package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PropertyDocument;
import bg.registryagency.epzeu.pr.application.segment.PropertyDocumentTypeNomenclature;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PropertyDocumentDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import org.springframework.util.StringUtils;

public class PropertyDocumentDtoMapper {
    public static PropertyDocument asModel(PropertyDocumentDto dto) {
        if(dto == null) {
            return null;
        }

        PropertyDocument propertyDocument = new PropertyDocument();
        propertyDocument.setActNumber(dto.getActNumber());
        propertyDocument.setDescription(StringUtils.hasText(dto.getDescription()) ? dto.getDescription() : null);
        propertyDocument.setIncomingRegisterNumber(dto.getIncomingRegisterNumber());
        propertyDocument.setPropertyDocumentDate(dto.getPropertyDocumentDate());
        propertyDocument.setType(PropertyDocumentTypeNomenclature.fromInteger(dto.getType()));
        propertyDocument.setVolume(dto.getVolume());

        return propertyDocument;
    }

    public static PropertyDocumentDto asDto(PropertyDocument propertyDocument) {
        if(propertyDocument == null) {
            return new PropertyDocumentDto();
        }

        PropertyDocumentDto dto = new PropertyDocumentDto();
        dto.setActNumber(propertyDocument.getActNumber());
        dto.setDescription(propertyDocument.getDescription());
        dto.setIncomingRegisterNumber(propertyDocument.getIncomingRegisterNumber());
        dto.setPropertyDocumentDate(propertyDocument.getPropertyDocumentDate());
        dto.setType(propertyDocument.getType().getKey());
        dto.setVolume(propertyDocument.getVolume());

        return dto;
    }
}
