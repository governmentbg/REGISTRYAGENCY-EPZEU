package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.CompanyCase;
import bg.registryagency.epzeu.pr.integration.pr.dto.CompanyCaseDto;
import org.springframework.util.StringUtils;

public class CompanyCaseDtoMapper {
    public static CompanyCase asModel(CompanyCaseDto companyCaseDto) {
        if(companyCaseDto == null) {
            return null;
        }

        CompanyCase companyCase = new CompanyCase();
        companyCase.setNumber(StringUtils.hasText(companyCaseDto.getNumber()) ? companyCaseDto.getNumber() : null);
        companyCase.setYear(companyCaseDto.getYear());
        companyCase.setRegistrationCourt(CourtDtoMapper.asModel(companyCaseDto.getRegistrationCourt()));

        return companyCase;
    }

    public static CompanyCaseDto asDto(CompanyCase companyCase) {
        if(companyCase == null) {
            return new CompanyCaseDto();
        }

        CompanyCaseDto dto = new CompanyCaseDto();
        dto.setNumber(companyCase.getNumber());
        dto.setYear(companyCase.getYear());
        dto.setRegistrationCourt(CourtDtoMapper.asDto(companyCase.getRegistrationCourt()));

        return dto;
    }
}
