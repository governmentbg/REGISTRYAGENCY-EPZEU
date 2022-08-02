package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.RegistryOffice;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;

public class RegistryOfficeDtoMapper {
    public static RegistryOffice asModel(RegistryOfficeDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        RegistryOffice registryOffice = new RegistryOffice();
        registryOffice.setId(dto.getId());
        registryOffice.setName(dto.getName());

        return registryOffice;
    }

    public static RegistryOfficeDto asDto(RegistryOffice registryOffice) {
        if(registryOffice == null) {
            return new RegistryOfficeDto();
        }

        RegistryOfficeDto dto = new RegistryOfficeDto();
        dto.setId(registryOffice.getId());
        dto.setName(registryOffice.getName());

        return dto;
    }
}
