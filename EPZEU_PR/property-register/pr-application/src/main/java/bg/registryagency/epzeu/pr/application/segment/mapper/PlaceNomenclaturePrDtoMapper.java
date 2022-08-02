package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PlaceNomenclaturePr;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;

public class PlaceNomenclaturePrDtoMapper {
    public static PlaceNomenclaturePr asModel(PlaceNomenclaturePrDto dto) {
        if(dto == null || dto.getPlaceId() == null) {
            return null;
        }

        PlaceNomenclaturePr place = new PlaceNomenclaturePr();
        place.setId(dto.getPlaceId());
        place.setName(dto.getName());

        return place;
    }

    public static PlaceNomenclaturePrDto asDto(PlaceNomenclaturePr place) {
        if(place == null) {
            return new PlaceNomenclaturePrDto();
        }

        PlaceNomenclaturePrDto dto = new PlaceNomenclaturePrDto();
        dto.setPlaceId(place.getId());
        dto.setName(place.getName());

        return dto;
    }
}
