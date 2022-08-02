package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.RequestForReportOfPersonInAllRegistryOffices;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PeriodForReportDtoMapper;
import bg.registryagency.epzeu.pr.integration.api.application.ReportForPersonInAllRegistryOfficesDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PersonSubjectOfReportInAllRegistryOfficesSectionDto;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;

import java.time.LocalDate;

public class RequestForReportOfPersonInAllRegistryOfficesDtoMapper {
    public static RequestForReportOfPersonInAllRegistryOffices asModel(ReportForPersonInAllRegistryOfficesDto dto) {
        if(dto == null) {
            return null;
        }

        PersonSubjectOfReportInAllRegistryOfficesSectionDto personSubjectForReportInAllRegistryOfficesDto = dto.getPersonSubjectOfReportInAllRegistryOfficesSection();

        var application = new RequestForReportOfPersonInAllRegistryOffices();
        application.setPeriodForReport(PeriodForReportDtoMapper.asModel(personSubjectForReportInAllRegistryOfficesDto.getPeriodForReport()));
        application.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(dto.getApplicantDataOfReport()));
        application.setGdprAgreement(GdprAgreementDtoMapper.asModel(dto.getGdprAgreement()));

        if(PersonTypeNomenclature.fromInteger(personSubjectForReportInAllRegistryOfficesDto.getPersonType()) == PersonTypeNomenclature.INDIVIDUAL) {
            application.setPersonType(PersonTypeNomenclature.INDIVIDUAL);
            application.setIdentity(IdentityDtoMapper.asModel(personSubjectForReportInAllRegistryOfficesDto.getIdentity()));
            if(application.getIdentity().getBirthDate() != null) {
                throw new IllegalArgumentException("Report for Person in all registry offices cannot have person with birth date as Identity!");
            }
        } else {
            application.setPersonType(PersonTypeNomenclature.LEGAL_ENTITY);
            application.setLegalEntityNumber(personSubjectForReportInAllRegistryOfficesDto.getLegalEntityNumber());
        }

        if (application.getPeriodForReport().getEndDate() == null) {
            application.getPeriodForReport().setEndDate(LocalDate.now());
        }

        return application;
    }

    public static ReportForPersonInAllRegistryOfficesDto asDto(RequestForReportOfPersonInAllRegistryOffices application) {
        if(application == null) {
            return null;
        }

        var personSubjectOfReportInAllRegistryOfficesSectionDto = new PersonSubjectOfReportInAllRegistryOfficesSectionDto();
        personSubjectOfReportInAllRegistryOfficesSectionDto.setPeriodForReport(PeriodForReportDtoMapper.asDto(application.getPeriodForReport()));
        personSubjectOfReportInAllRegistryOfficesSectionDto.setPersonType(application.getPersonType().getKey());
        personSubjectOfReportInAllRegistryOfficesSectionDto.setIdentity(IdentityDtoMapper.asDto(application.getIdentity()));
        personSubjectOfReportInAllRegistryOfficesSectionDto.setLegalEntityNumber(application.getLegalEntityNumber());

        var reportForPersonInAllRegistryOffices = new ReportForPersonInAllRegistryOfficesDto();
        reportForPersonInAllRegistryOffices.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDto(application.getApplicantData()));
        reportForPersonInAllRegistryOffices.setPersonSubjectOfReportInAllRegistryOfficesSection(personSubjectOfReportInAllRegistryOfficesSectionDto);
        reportForPersonInAllRegistryOffices.setAppFormType(ApplicationType.REQUEST_FOR_REPORT_FOR_PERSON_IN_ALL_REGISTRY_OFFICES.getCode());
        reportForPersonInAllRegistryOffices.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return reportForPersonInAllRegistryOffices;
    }
}
