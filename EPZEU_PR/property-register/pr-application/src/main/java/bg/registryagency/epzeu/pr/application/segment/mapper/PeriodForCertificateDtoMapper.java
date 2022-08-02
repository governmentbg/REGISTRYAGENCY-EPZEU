package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PeriodForCertificate;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PeriodForCertificateDto;

public class PeriodForCertificateDtoMapper {
    public static PeriodForCertificate asModel(PeriodForCertificateDto dto) {
        if(dto == null) {
            return null;
        }

        PeriodForCertificate period = new PeriodForCertificate();
        period.setExpectedRegistrationDate(dto.getExpectedRegistrationDate());
        period.setPeriodForReport(PeriodForReportDtoMapper.asModel(dto.getPeriodForReport()));

        return period;
    }

    public static PeriodForCertificateDto asDto(PeriodForCertificate period) {
        if(period == null) {
            return new PeriodForCertificateDto(true);
        }

        PeriodForCertificateDto dto = new PeriodForCertificateDto(false);
        dto.setExpectedRegistrationDate(period.getExpectedRegistrationDate());
        dto.setPeriodForReport(PeriodForReportDtoMapper.asDto(period.getPeriodForReport()));

        return dto;
    }
}
