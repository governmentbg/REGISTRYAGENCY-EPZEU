package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Address;
import bg.registryagency.epzeu.pr.application.segment.Ekatte;
import bg.registryagency.epzeu.pr.integration.api.application.segment.AddressDto;
import org.springframework.util.StringUtils;

public class AddressDtoMapper {
    public static Address asModel(AddressDto addressDto) {
        if(addressDto == null) {
            return null;
        }

        boolean allIsNull = true;

        Address address = new Address();
        if(addressDto.getSettlementEkatteCode() != null) {
            address.setSettlement(new Ekatte(addressDto.getSettlementEkatteCode(), addressDto.getSettlementName()));
            allIsNull = false;
        }
        if(addressDto.getAreaEkatteCode() != null) {
            address.setArea(new Ekatte(addressDto.getAreaEkatteCode(), addressDto.getAreaName()));
            allIsNull = false;
        }
        if(addressDto.getMunicipalityEkatteCode() != null) {
            address.setMunicipality(new Ekatte(addressDto.getMunicipalityEkatteCode(), addressDto.getMunicipalityName()));
            allIsNull = false;
        }
        if(addressDto.getRegionEkatteCode() != null) {
            address.setRegion(new Ekatte(addressDto.getRegionEkatteCode(), addressDto.getRegionName()));
            allIsNull = false;
        }
        if(addressDto.getPostCode() != null) {
            address.setPostCode(addressDto.getPostCode());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getStreet())) {
            address.setStreet(addressDto.getStreet());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getHousingEstate())) {
            address.setHousingEstate(addressDto.getHousingEstate());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getStreetNumber())) {
            address.setStreetNumber( addressDto.getStreetNumber());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getBlock())) {
            address.setBlock(addressDto.getBlock());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getEntrance())) {
            address.setEntrance(addressDto.getEntrance());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getFloor())) {
            address.setFloor(addressDto.getFloor());
            allIsNull = false;
        }
        if(StringUtils.hasText(addressDto.getApartment())) {
            address.setApartment(addressDto.getApartment());
            allIsNull = false;
        }

        if(allIsNull) {
            address = null;
        }

        return address;
    }

    public static AddressDto asDto(Address address) {
        if(address == null) {
            return new AddressDto();
        }

        AddressDto dto = new AddressDto();
        dto.setSettlementEkatteCode(address.getSettlement().getCode());
        dto.setSettlementName(address.getSettlement().getName());
        if(address.getArea() != null && StringUtils.hasText(address.getArea().getCode())) {
            dto.setAreaEkatteCode(address.getArea().getCode());
            dto.setAreaName(address.getArea().getName());
        }
        dto.setMunicipalityEkatteCode(address.getMunicipality().getCode());
        dto.setMunicipalityName(address.getMunicipality().getName());
        dto.setRegionEkatteCode(address.getRegion().getCode());
        dto.setRegionName(address.getRegion().getName());
        dto.setPostCode(address.getPostCode());
        dto.setStreet(address.getStreet());
        dto.setHousingEstate(address.getHousingEstate());
        dto.setStreetNumber(address.getStreetNumber());
        dto.setBlock(address.getBlock());
        dto.setEntrance(address.getEntrance());
        dto.setFloor(address.getFloor());
        dto.setApartment(address.getApartment());

        return dto;
    }
}
