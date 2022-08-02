package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.LegalEntity;
import bg.registryagency.epzeu.pr.integration.api.application.segment.LegalEntityDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.pr.dto.CompanyCaseDto;
import org.springframework.util.StringUtils;

public class LegalEntityDtoMapper {
    public static LegalEntity asModel(LegalEntityDto legalEntityDto) {
        if(legalEntityDto == null) {
            return null;
        }

        LegalEntity legalEntity = new LegalEntity();
        legalEntity.setCountry(CountryDtoMapper.asModel(legalEntityDto.getCountry()));
        //When legal entity is bulgarian map model field LegalEntityNumber to LegalEntityNumber(EIK/BULSTAT)
        //When legal entity is foreign map model field LegalEntityNumber with dto field id - this field is used for foreign legal entity identifier
        //It is possible only one of these two field to be set
        legalEntity.setLegalEntityNumber(StringUtils.hasText(legalEntityDto.getLegalEntityNumber()) ? legalEntityDto.getLegalEntityNumber() : legalEntityDto.getId());
        legalEntity.setCompanyName(legalEntityDto.getCompanyName());

        CompanyCaseDto companyCase = legalEntityDto.getCompanyCase();

        if(companyCase != null && StringUtils.hasText(companyCase.getNumber()) && companyCase.getYear() != null && companyCase.getYear() > 0 ) {
            legalEntity.setCompanyCase(CompanyCaseDtoMapper.asModel(companyCase));
        }

        return legalEntity;
    }

    public static LegalEntityDto asDto(LegalEntity legalEntity) {
        if(legalEntity == null) {
            return new LegalEntityDto(true);
        }

        LegalEntityDto dto = new LegalEntityDto(false);
        dto.setCountry(CountryDtoMapper.asDto(legalEntity.getCountry()));

        if(legalEntity.getCountry().getCode() != ApplicationConstants.COUNTRY_BULGARIA_CODE) {
            dto.setId(legalEntity.getLegalEntityNumber());
        } else {
            dto.setLegalEntityNumber(legalEntity.getLegalEntityNumber());
        }

        dto.setCompanyName(legalEntity.getCompanyName());
        dto.setCompanyCase(CompanyCaseDtoMapper.asDto(legalEntity.getCompanyCase()));

        return dto;
    }
}
