package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.IndividualOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.IndividualOfReportDto;
import org.springframework.util.StringUtils;

public class IndividualOfReportDtoMapper {
    public static IndividualOfReport asModel(IndividualOfReportDto individualOfReportDto) {
        if(individualOfReportDto == null) {
            return null;
        }

        IndividualOfReport individualOfReport = new IndividualOfReport();
        individualOfReport.setIndividualNameOfReport(IndividualNameOfReportDtoMapper.asModel(individualOfReportDto.getApplicantName()));
        individualOfReport.setIdentity(StringUtils.hasText(individualOfReportDto.getIdentity()) ? individualOfReportDto.getIdentity() : null);
        individualOfReport.setPersonNationality(CountryDtoMapper.asModel(individualOfReportDto.getPersonNationality()));

        return individualOfReport;
    }

    public static IndividualOfReportDto asDto(IndividualOfReport individualOfReport) {
        if(individualOfReport == null) {
            return new IndividualOfReportDto();
        }

        IndividualOfReportDto dto = new IndividualOfReportDto();
        dto.setApplicantName(IndividualNameOfReportDtoMapper.asDto(individualOfReport.getIndividualNameOfReport()));
        dto.setIdentity(individualOfReport.getIdentity());
        dto.setPersonNationality(CountryDtoMapper.asDto(individualOfReport.getPersonNationality()));

        return dto;
    }
}
