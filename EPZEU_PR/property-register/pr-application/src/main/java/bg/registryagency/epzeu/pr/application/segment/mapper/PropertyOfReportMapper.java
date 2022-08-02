package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PropertyOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.PermanentUsageDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyOfReportDto;

public class PropertyOfReportMapper {
    public static PropertyOfReport asModel(PropertyOfReportDto dto) {
        if(dto == null) {
            return null;
        }

        PropertyOfReport propertyOfReport = new PropertyOfReport();
        propertyOfReport.setPropertyId(dto.getPropertyId());
        propertyOfReport.setAccountNumber(dto.getAccountNumber());
        propertyOfReport.setApartment(dto.getFlat());
        propertyOfReport.setAreaByDocuments(dto.getAreaByDocuments());
        propertyOfReport.setBlock(dto.getBuilding());
        propertyOfReport.setCadastralId(dto.getCadastralIdentifier());
        propertyOfReport.setCadastreNumber(dto.getCadastreNumber());
        propertyOfReport.setCountrySide(dto.getPlace());
        propertyOfReport.setDistrict(dto.getDistrict());
        propertyOfReport.setEntrance(dto.getEntrance());
        propertyOfReport.setFloor(dto.getFloor());
        propertyOfReport.setHousingEstate(dto.getHousingEstate());
        propertyOfReport.setOldAccountNumber(dto.getOldAccountNumber());
        propertyOfReport.setPermanentUsage(PermanentUsageDtoMapper.asModel(dto.getPermanentUsage()));
        propertyOfReport.setPlot(dto.getPlot());
        propertyOfReport.setPropertyRemark(dto.getRemark());
        propertyOfReport.setRegulatedNeighborhood(dto.getRegulatedNeighborhood());
        propertyOfReport.setStreet(dto.getStreet());
        propertyOfReport.setStreetNumber(dto.getStreetNumber());
        propertyOfReport.setType(PropertyTypeDtoMapper.asModel(dto.getPropertyType()));
        propertyOfReport.setSettlement(PlaceNomenclaturePrDtoMapper.asModel(dto.getSettlement()));

        PlaceNomenclaturePrDto placePR = dto.getSettlement().getPlacePR();
        if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.MUNICIPALITY) {
            propertyOfReport.setMunicipality(PlaceNomenclaturePrDtoMapper.asModel(placePR));

            placePR = placePR.getPlacePR();
            //In Property Register which is source of PlacePR nomenclature area is region for EPZEU EKATTE
            if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.AREA) {
                propertyOfReport.setArea(PlaceNomenclaturePrDtoMapper.asModel(placePR));
            }
        }

        propertyOfReport.setRegistryOffice(RegistryOfficeDtoMapper.asModel(dto.getRegistryOffice()));


        return propertyOfReport;
    }

    public static PropertyOfReportDto asDto(PropertyOfReport propertyOfReport) {
        if(propertyOfReport == null) {
            return new PropertyOfReportDto();
        }

        PropertyOfReportDto dto = new PropertyOfReportDto();
        dto.setPropertyId(propertyOfReport.getPropertyId());
        dto.setAccountNumber(propertyOfReport.getAccountNumber());
        dto.setFlat(propertyOfReport.getApartment());
        dto.setAreaByDocuments(propertyOfReport.getAreaByDocuments());
        dto.setBuilding(propertyOfReport.getBlock());
        dto.setCadastralIdentifier(propertyOfReport.getCadastralId());
        dto.setCadastreNumber(propertyOfReport.getCadastreNumber());
        dto.setPlace(propertyOfReport.getCountrySide());
        dto.setDistrict(propertyOfReport.getDistrict());
        dto.setEntrance(propertyOfReport.getEntrance());
        dto.setFloor(propertyOfReport.getFloor());
        dto.setHousingEstate(propertyOfReport.getHousingEstate());
        dto.setOldAccountNumber(propertyOfReport.getOldAccountNumber());
        dto.setPermanentUsage(PermanentUsageDtoMapper.asDto(propertyOfReport.getPermanentUsage()));
        dto.setPlot(propertyOfReport.getPlot());
        dto.setRemark(propertyOfReport.getPropertyRemark());
        dto.setRegulatedNeighborhood(propertyOfReport.getRegulatedNeighborhood());
        dto.setStreet(propertyOfReport.getStreet());
        dto.setStreetNumber(propertyOfReport.getStreetNumber());
        dto.setPropertyType(PropertyTypeDtoMapper.asDto(propertyOfReport.getType()));
        PlaceNomenclaturePrDto settlementDto = PlaceNomenclaturePrDtoMapper.asDto(propertyOfReport.getSettlement());
        dto.setSettlement(settlementDto);

        if(settlementDto != null) {
            PlaceNomenclaturePrDto municipalityDto = PlaceNomenclaturePrDtoMapper.asDto(propertyOfReport.getMunicipality());
            settlementDto.setPlacePR(municipalityDto);

            if(municipalityDto != null) {
                municipalityDto.setPlacePR(PlaceNomenclaturePrDtoMapper.asDto(propertyOfReport.getArea()));
            }
        }

        dto.setRegistryOffice(RegistryOfficeDtoMapper.asDto(propertyOfReport.getRegistryOffice()));

        return dto;
    }
}
