package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Court;
import bg.registryagency.epzeu.pr.integration.api.application.segment.CourtDto;

public class CourtDtoMapper {
    public static Court asModel(CourtDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        Court court = new Court();
        court.setId(dto.getId());
        court.setName(dto.getName());

        return court;
    }

    public static CourtDto asDto(Court court) {
        if(court == null) {
            return new CourtDto();
        }

        CourtDto dto = new CourtDto();
        dto.setId(court.getId());
        dto.setName(court.getName());

        return dto;
    }
}
