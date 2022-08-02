package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Country;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;

public class CountryDtoMapper {
    public static Country asModel(CountryDto dto) {
        if(dto == null || dto.getCode() == null) {
            return null;
        }

        Country country = new Country();
        country.setCode(dto.getCode());
        country.setName(dto.getName());

        return country;
    }

    public static CountryDto asDto(Country country) {
        if(country == null) {
            return new CountryDto();
        }

        CountryDto dto = new CountryDto();
        dto.setCode(country.getCode());
        dto.setName(country.getName());

        return dto;
    }
}
