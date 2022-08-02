package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Name;
import bg.registryagency.epzeu.pr.integration.pr.dto.NameDto;
import org.springframework.util.StringUtils;

public class NameDtoMapper {
    public static Name asModel(NameDto nameDto) {
        if(nameDto == null) {
            return null;
        }

        Name name = new Name();
        name.setFirstName(nameDto.getFirstName());
        name.setSurName(StringUtils.hasText(nameDto.getSurName()) ? nameDto.getSurName() : null);
        name.setFamilyName(nameDto.getFamilyName());

        return name;
    }

    public static NameDto asDto(Name name) {
        if(name == null) {
            return new NameDto();
        }

        NameDto dto = new NameDto();
        dto.setFirstName(name.getFirstName());
        dto.setSurName(name.getSurName());
        dto.setFamilyName(name.getFamilyName());

        return dto;
    }
}
