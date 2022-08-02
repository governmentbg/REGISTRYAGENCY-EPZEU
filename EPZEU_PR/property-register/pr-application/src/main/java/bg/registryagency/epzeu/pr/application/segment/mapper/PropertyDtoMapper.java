package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Property;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PropertyDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import org.springframework.util.StringUtils;

public class PropertyDtoMapper {
    public static Property asModel(PropertyDto dto) {
        if(dto == null) {
            return null;
        }

        Property property = new Property();
        property.setAccountNumber(StringUtils.hasText(dto.getAccountNumber()) ? dto.getAccountNumber() : null);
        property.setType(PropertyTypeDtoMapper.asModel(dto.getType()));
        property.setSettlement(PlaceNomenclaturePrDtoMapper.asModel(dto.getSettlement()));
        PlaceNomenclaturePrDto placePR = dto.getSettlement().getPlacePR();
        if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.MUNICIPALITY) {
            property.setMunicipality(PlaceNomenclaturePrDtoMapper.asModel(placePR));

            placePR = placePR.getPlacePR();
            //In Property Register which is source of PlacePR nomenclature area is region for EPZEU EKATTE
            if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.AREA) {
                property.setArea(PlaceNomenclaturePrDtoMapper.asModel(placePR));
            }
        }

        property.setAreaByDocuments(dto.getAreaByDocuments());
        property.setCadastralId(StringUtils.hasText(dto.getCadastralId()) ? dto.getCadastralId() : null);
        property.setCountrySide(StringUtils.hasText(dto.getCountrySide()) ? dto.getCountrySide() : null);
        property.setOldAccountNumber(StringUtils.hasText(dto.getOldAccountNumber()) ? dto.getOldAccountNumber() : null);
        property.setPropertyLimits(StringUtils.hasText(dto.getPropertyLimits()) ? dto.getPropertyLimits() : null);
        property.setPropertyRemark(StringUtils.hasText(dto.getPropertyRemark()) ? dto.getPropertyRemark() : null);

        return property;
    }

    public static PropertyDto asDto(Property property) {
        if(property == null) {
            return new PropertyDto(true);
        }

        PropertyDto dto = new PropertyDto(false);
        dto.setAccountNumber(property.getAccountNumber());
        dto.setType(PropertyTypeDtoMapper.asDto(property.getType()));
        PlaceNomenclaturePrDto settlementDto = PlaceNomenclaturePrDtoMapper.asDto(property.getSettlement());

        if(settlementDto != null) {
            settlementDto.setType(PlaceNomenclaturePrDto.Type.SETTLEMENT);
            dto.setSettlement(settlementDto);

            PlaceNomenclaturePrDto municipalityDto = PlaceNomenclaturePrDtoMapper.asDto(property.getMunicipality());

            if(municipalityDto != null) {
                municipalityDto.setType(PlaceNomenclaturePrDto.Type.MUNICIPALITY);
                settlementDto.setPlacePR(municipalityDto);

                PlaceNomenclaturePrDto areaDto = PlaceNomenclaturePrDtoMapper.asDto(property.getArea());

                if(areaDto != null) {
                    areaDto.setType(PlaceNomenclaturePrDto.Type.AREA);
                    municipalityDto.setPlacePR(areaDto);
                }
            }
        }

        dto.setAreaByDocuments(property.getAreaByDocuments());
        dto.setCadastralId(property.getCadastralId());
        dto.setCountrySide(property.getCountrySide());
        dto.setOldAccountNumber(property.getOldAccountNumber());
        dto.setPropertyLimits(property.getPropertyLimits());
        dto.setPropertyRemark(property.getPropertyRemark());

        return dto;
    }
}
