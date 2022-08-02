package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.PersonOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.PersonOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;

public class PersonOfReportMapper {
    public static PersonOfReport asModel(PersonOfReportDto personOfReportDto) {
        if(personOfReportDto == null) {
            return null;
        }

        PersonOfReport personOfReport = new PersonOfReport();
        personOfReport.setPersonId(personOfReportDto.getId());
        personOfReport.setRegistryOffice(RegistryOfficeDtoMapper.asModel(personOfReportDto.getRegistryOffice()));
        personOfReport.setIndividual(IndividualOfReportDtoMapper.asModel(personOfReportDto.getIndividual()));
        personOfReport.setLegalEntity(LegalEntityOfReportDtoMapper.asModel(personOfReportDto.getLegalEntity()));

        return personOfReport;
    }

    public static PersonOfReportDto asDto(PersonOfReport personOfReport) {
        if(personOfReport == null) {
            return new PersonOfReportDto();
        }

        PersonOfReportDto dto = new PersonOfReportDto();
        dto.setId(personOfReport.getPersonId());
        dto.setType(personOfReport.getIndividual() != null ? PersonTypeNomenclature.INDIVIDUAL : PersonTypeNomenclature.LEGAL_ENTITY);
        dto.setRegistryOffice(RegistryOfficeDtoMapper.asDto(personOfReport.getRegistryOffice()));
        dto.setIndividual(IndividualOfReportDtoMapper.asDto(personOfReport.getIndividual()));
        dto.setLegalEntity(LegalEntityOfReportDtoMapper.asDto(personOfReport.getLegalEntity()));

        return dto;
    }
}
