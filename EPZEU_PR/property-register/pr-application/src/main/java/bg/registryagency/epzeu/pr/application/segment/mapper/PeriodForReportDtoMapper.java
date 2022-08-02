package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PeriodForReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.PeriodForReportDto;

public class PeriodForReportDtoMapper {
    public static PeriodForReport asModel(PeriodForReportDto periodForReportDto) {
        if(periodForReportDto == null) {
            return null;
        }

        PeriodForReport periodForReport = new PeriodForReport();
        periodForReport.setStartDate(periodForReportDto.getStartDate());
        periodForReport.setEndDate(periodForReportDto.getEndDate());

        return periodForReport;
    }

    public static PeriodForReportDto asDto(PeriodForReport periodForReport) {
        if(periodForReport == null) {
            return new PeriodForReportDto();
        }

        PeriodForReportDto dto = new PeriodForReportDto();
        dto.setStartDate(periodForReport.getStartDate());
        dto.setEndDate(periodForReport.getEndDate());

        return dto;
    }
}
