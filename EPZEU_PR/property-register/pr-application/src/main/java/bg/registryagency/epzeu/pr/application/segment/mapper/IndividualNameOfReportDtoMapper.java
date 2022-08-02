package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.IndividualNameOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.NameDto;
import org.springframework.util.StringUtils;

public class IndividualNameOfReportDtoMapper {
    public static IndividualNameOfReport asModel(NameDto applicantNameDto) {
        if(applicantNameDto == null) {
            return null;
        }

        IndividualNameOfReport individualNameOfReport = new IndividualNameOfReport();
        individualNameOfReport.setFirstName(StringUtils.hasText(applicantNameDto.getFirstName()) ? applicantNameDto.getFirstName() : null);
        individualNameOfReport.setSurName(StringUtils.hasText(applicantNameDto.getSurName()) ? applicantNameDto.getSurName() : null);
        individualNameOfReport.setFamilyName(StringUtils.hasText(applicantNameDto.getFamilyName()) ? applicantNameDto.getFamilyName() : null);

        return individualNameOfReport;
    }

    public static NameDto asDto(IndividualNameOfReport individualNameOfReport) {
        if(individualNameOfReport == null) {
            return new NameDto();
        }

        NameDto dto = new NameDto();
        dto.setFirstName(individualNameOfReport.getFirstName());
        dto.setSurName(individualNameOfReport.getSurName());
        dto.setFamilyName(individualNameOfReport.getFamilyName());

        return dto;
    }
}
