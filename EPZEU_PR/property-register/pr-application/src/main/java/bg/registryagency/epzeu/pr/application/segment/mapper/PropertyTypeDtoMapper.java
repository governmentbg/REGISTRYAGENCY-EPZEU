package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PropertyType;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyTypeNomDto;

public class PropertyTypeDtoMapper {
    public static PropertyType asModel(PropertyTypeNomDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        PropertyType propertyType = new PropertyType();
        propertyType.setId(dto.getId());
        propertyType.setName(dto.getName());

        return propertyType;
    }

    public static PropertyTypeNomDto asDto(PropertyType propertyType) {
        if(propertyType == null) {
            return new PropertyTypeNomDto();
        }

        PropertyTypeNomDto dto = new PropertyTypeNomDto();
        dto.setId(propertyType.getId());
        dto.setName(propertyType.getName());

        return dto;
    }
}
