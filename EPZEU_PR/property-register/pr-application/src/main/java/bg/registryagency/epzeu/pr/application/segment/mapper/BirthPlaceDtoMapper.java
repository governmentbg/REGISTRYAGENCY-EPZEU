package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.BirthPlace;
import bg.registryagency.epzeu.pr.integration.api.application.segment.BirthPlaceDto;
import org.springframework.util.StringUtils;

public class BirthPlaceDtoMapper {
    public static BirthPlace asModel(BirthPlaceDto birthPlaceDto) {
        if(birthPlaceDto == null) {
            return null;
        }

        BirthPlace birthPlace = new BirthPlace();
        birthPlace.setCountryName(StringUtils.hasText(birthPlaceDto.getCountry()) ? birthPlaceDto.getCountry() : null);
        birthPlace.setPlaceName(StringUtils.hasText(birthPlaceDto.getPlace()) ? birthPlaceDto.getPlace() : null);

        return birthPlace;
    }

    public static BirthPlaceDto asDto(BirthPlace birthPlace) {
        if(birthPlace == null) {
            return new BirthPlaceDto();
        }

        BirthPlaceDto dto = new BirthPlaceDto();
        dto.setCountry(birthPlace.getCountryName());
        dto.setPlace(birthPlace.getPlaceName());

        return dto;
    }
}
