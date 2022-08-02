package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.RegisterType;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegisterTypeDto;

public class RegisterTypeDtoMapper {
    public static RegisterType asModel(RegisterTypeDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        RegisterType registerType = new RegisterType();
        registerType.setId(dto.getId());
        registerType.setName(dto.getName());

        return registerType;
    }

    public static RegisterTypeDto asDto(RegisterType registerType) {
        if(registerType == null) {
            return new RegisterTypeDto();
        }

        RegisterTypeDto dto = new RegisterTypeDto();
        dto.setId(registerType.getId());
        dto.setName(registerType.getName());

        return dto;
    }
}
