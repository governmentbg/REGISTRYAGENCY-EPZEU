package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.LegalEntityOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.CompanyCaseDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.LegalEntityOfReportDto;
import org.springframework.util.StringUtils;

public class LegalEntityOfReportDtoMapper {
    public static LegalEntityOfReport asModel(LegalEntityOfReportDto legalEntityOfReportDto) {
        if(legalEntityOfReportDto == null) {
            return null;
        }

        LegalEntityOfReport legalEntityOfReport = new LegalEntityOfReport();
        legalEntityOfReport.setLegalEntityNumber(StringUtils.hasText(legalEntityOfReportDto.getLegalEntityNumber()) ? legalEntityOfReportDto.getLegalEntityNumber() : null);
        legalEntityOfReport.setCountry(CountryDtoMapper.asModel(legalEntityOfReportDto.getCountry()));
        legalEntityOfReport.setCompanyName(StringUtils.hasText(legalEntityOfReportDto.getCompanyName()) ? legalEntityOfReportDto.getCompanyName() : null);

        CompanyCaseDto companyCase = legalEntityOfReportDto.getCompanyCase();
        if(companyCase != null && StringUtils.hasText(companyCase.getNumber()) && companyCase.getYear() != null && companyCase.getYear() > 0 ) {
            legalEntityOfReport.setCompanyCase(CompanyCaseDtoMapper.asModel(companyCase));
        }

        return legalEntityOfReport;
    }

    public static LegalEntityOfReportDto asDto(LegalEntityOfReport legalEntityOfReport) {
        if(legalEntityOfReport == null) {
            return new LegalEntityOfReportDto();
        }

        LegalEntityOfReportDto dto = new LegalEntityOfReportDto();
        dto.setLegalEntityNumber(legalEntityOfReport.getLegalEntityNumber());
        dto.setCountry(CountryDtoMapper.asDto(legalEntityOfReport.getCountry()));
        dto.setCompanyName(legalEntityOfReport.getCompanyName());
        dto.setCompanyCase(CompanyCaseDtoMapper.asDto(legalEntityOfReport.getCompanyCase()));

        return dto;
    }
}
