package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ServiceType;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ServiceTypeDto;

public class ServiceTypeDtoMapper {
    public static ServiceType asModel(ServiceTypeDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        ServiceType serviceType = new ServiceType();
        serviceType.setId(dto.getId());
        serviceType.setName(dto.getName());

        return serviceType;
    }

    public static ServiceTypeDto asDto(ServiceType serviceType) {
        if(serviceType == null) {
            return new ServiceTypeDto();
        }

        ServiceTypeDto dto = new ServiceTypeDto();
        dto.setId(serviceType.getId());
        dto.setName(serviceType.getName());

        return dto;
    }
}
