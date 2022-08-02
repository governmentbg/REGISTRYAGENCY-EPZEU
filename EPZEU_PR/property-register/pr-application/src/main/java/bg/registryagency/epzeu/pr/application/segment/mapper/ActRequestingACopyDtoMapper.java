package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ActRequestingACopy;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ActRequestingACopyDto;
import org.springframework.util.StringUtils;

public class ActRequestingACopyDtoMapper {
    public static ActRequestingACopy asModel(ActRequestingACopyDto dto) {
        if (dto == null) {
            return null;
        }

        ActRequestingACopy actRequestingACopy = new ActRequestingACopy();
        actRequestingACopy.setRegistryOffice(RegistryOfficeDtoMapper.asModel(dto.getRegistryOffice()));
        actRequestingACopy.setCopyReason(dto.getCopyReason());

        if(dto.getActOldData().getActOldNumber() != null) {
            actRequestingACopy.setActOldData(ActOldDataDtoMapper.asModel(dto.getActOldData()));
        } else {
            actRequestingACopy.setActData(ActDataDtoMapper.asModel(dto.getActData()));
        }

        return  actRequestingACopy;
    }

    public static ActRequestingACopyDto asDto(ActRequestingACopy actRequestingACopy) {
        if (actRequestingACopy == null) {
            return new ActRequestingACopyDto(true);
        }

        ActRequestingACopyDto dto = new ActRequestingACopyDto(false);
        dto.setCopyReason(actRequestingACopy.getCopyReason());
        dto.setRegistryOffice(RegistryOfficeDtoMapper.asDto(actRequestingACopy.getRegistryOffice()));
        dto.setActData(ActDataDtoMapper.asDto(actRequestingACopy.getActData()));
        dto.setActOldData(ActOldDataDtoMapper.asDto(actRequestingACopy.getActOldData()));
        dto.setIsBeforeStartDate(actRequestingACopy.getActOldData() != null && StringUtils.hasText(actRequestingACopy.getActOldData().getCaseNumber()));

        return dto;
    }
}
