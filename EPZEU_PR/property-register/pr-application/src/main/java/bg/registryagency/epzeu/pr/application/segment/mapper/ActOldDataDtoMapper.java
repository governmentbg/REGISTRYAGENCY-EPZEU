package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ActOldData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ActOldDataDto;
import org.springframework.util.StringUtils;

public class ActOldDataDtoMapper {
    public static ActOldData asModel(ActOldDataDto dto) {
        if(dto == null) {
            return null;
        }

        ActOldData actOldData = new ActOldData();
        actOldData.setActAdditionalData(dto.getActAdditionalData());
        actOldData.setActOldNumber(dto.getActOldNumber());
        actOldData.setCaseNumber(StringUtils.hasText(dto.getCaseNumber()) ? dto.getCaseNumber() : null);
        actOldData.setVolumeOld(dto.getVolumeOld());
        actOldData.setYear(dto.getYear());

        return actOldData;
    }

    public static ActOldDataDto asDto(ActOldData actOldData) {
        if(actOldData == null) {
            return new ActOldDataDto();
        }

        ActOldDataDto dto = new ActOldDataDto();
        dto.setActAdditionalData(actOldData.getActAdditionalData());
        dto.setActOldNumber(actOldData.getActOldNumber());
        dto.setCaseNumber(actOldData.getCaseNumber());
        dto.setVolumeOld(actOldData.getVolumeOld());
        dto.setYear(actOldData.getYear());

        return dto;
    }
}
