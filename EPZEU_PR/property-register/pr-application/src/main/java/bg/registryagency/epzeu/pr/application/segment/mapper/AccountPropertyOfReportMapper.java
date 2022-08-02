package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.AccountPropertyOfReport;
import bg.registryagency.epzeu.pr.application.segment.PropertyOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.AccountPropertyOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyOfReportDto;

public class AccountPropertyOfReportMapper {
    public static AccountPropertyOfReport asModel(AccountPropertyOfReportDto dto) {
        if(dto == null) {
            return null;
        }

        AccountPropertyOfReport accountPropertyOfReport = new AccountPropertyOfReport();
        accountPropertyOfReport.setAccountPropertyId(dto.getAccountPropertyId());
        accountPropertyOfReport.setPropertyId(dto.getPropertyId());
        accountPropertyOfReport.setAccountNumber(dto.getAccountNumber());
        accountPropertyOfReport.setApartment(dto.getFlat());
        accountPropertyOfReport.setAreaByDocuments(dto.getAreaByDocuments());
        accountPropertyOfReport.setBlock(dto.getBuilding());
        accountPropertyOfReport.setCadastralId(dto.getCadastralIdentifier());
        accountPropertyOfReport.setCadastreNumber(dto.getCadastreNumber());
        accountPropertyOfReport.setCountrySide(dto.getPlace());
        accountPropertyOfReport.setDistrict(dto.getDistrict());
        accountPropertyOfReport.setEntrance(dto.getEntrance());
        accountPropertyOfReport.setFloor(dto.getFloor());
        accountPropertyOfReport.setHousingEstate(dto.getHousingEstate());
        accountPropertyOfReport.setOldAccountNumber(dto.getOldAccountNumber());
        accountPropertyOfReport.setPermanentUsage(PermanentUsageDtoMapper.asModel(dto.getPermanentUsage()));
        accountPropertyOfReport.setPlot(dto.getPlot());
        accountPropertyOfReport.setPropertyRemark(dto.getRemark());
        accountPropertyOfReport.setRegulatedNeighborhood(dto.getRegulatedNeighborhood());
        accountPropertyOfReport.setStreet(dto.getStreet());
        accountPropertyOfReport.setStreetNumber(dto.getStreetNumber());
        accountPropertyOfReport.setType(PropertyTypeDtoMapper.asModel(dto.getPropertyType()));
        accountPropertyOfReport.setSettlement(PlaceNomenclaturePrDtoMapper.asModel(dto.getSettlement()));

        PlaceNomenclaturePrDto placePR = dto.getSettlement().getPlacePR();
        if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.MUNICIPALITY) {
            accountPropertyOfReport.setMunicipality(PlaceNomenclaturePrDtoMapper.asModel(placePR));

            placePR = placePR.getPlacePR();
            //In Property Register which is source of PlacePR nomenclature area is region for EPZEU EKATTE
            if(placePR != null && placePR.getType() == PlaceNomenclaturePrDto.Type.AREA) {
                accountPropertyOfReport.setArea(PlaceNomenclaturePrDtoMapper.asModel(placePR));
            }
        }

        accountPropertyOfReport.setRegistryOffice(RegistryOfficeDtoMapper.asModel(dto.getRegistryOffice()));


        return accountPropertyOfReport;
    }

    public static AccountPropertyOfReportDto asDto(AccountPropertyOfReport propertyOfReport) {
        if(propertyOfReport == null) {
            return new AccountPropertyOfReportDto();
        }

        AccountPropertyOfReportDto dto = new AccountPropertyOfReportDto();
        dto.setAccountPropertyId(propertyOfReport.getAccountPropertyId());
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
