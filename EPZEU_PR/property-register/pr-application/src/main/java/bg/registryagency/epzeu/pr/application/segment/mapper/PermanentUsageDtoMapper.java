package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PermanentUsage;
import bg.registryagency.epzeu.pr.integration.pr.dto.PermanentUsageDto;

public class PermanentUsageDtoMapper {
    public static PermanentUsage asModel(PermanentUsageDto dto) {
        if (dto == null || dto.getId() == null) {
            return null;
        }

        PermanentUsage permanentUsage = new PermanentUsage();

        permanentUsage.setId(dto.getId());
        permanentUsage.setName(dto.getName());

        return permanentUsage;
    }

    public static PermanentUsageDto asDto(PermanentUsage permanentUsage) {
        if (permanentUsage == null) {
            return new PermanentUsageDto();
        }

        PermanentUsageDto dto = new PermanentUsageDto();

        dto.setId(permanentUsage.getId());
        dto.setName(permanentUsage.getName());

        return dto;
    }
}
