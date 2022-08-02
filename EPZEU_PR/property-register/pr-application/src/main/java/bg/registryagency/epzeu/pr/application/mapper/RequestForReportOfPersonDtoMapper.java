package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfPerson;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PeriodForReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PersonOfReportMapper;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForPersonDto;
import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfPersonDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PersonSubjectOfReportSectionDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RequestForReportOfPersonDtoMapper {

    public static List<BaseRequestForReport> asModels(GroupReportForPersonDto groupDto) {
        if(groupDto == null) {
            return new ArrayList<>();
        }

        List<BaseRequestForReport> applications = new ArrayList<>();

        List<RequestForReportOfPersonDto> requestsForReportOfPersonDto = groupDto.getPersonSubjectOfReportSection().getRequestsForReportOfPerson();

        for (RequestForReportOfPersonDto requestForReportOfPersonDto : requestsForReportOfPersonDto) {
            RequestForReportOfPerson requestForReportOfPerson = RequestForReportOfPersonDtoMapper.asModel(requestForReportOfPersonDto);
            requestForReportOfPerson.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(groupDto.getApplicantDataOfReport()));
            requestForReportOfPerson.setGdprAgreement(GdprAgreementDtoMapper.asModel(groupDto.getGdprAgreement()));

            if (requestForReportOfPerson.getPeriodForReport().getEndDate() == null) {
                requestForReportOfPerson.getPeriodForReport().setEndDate(LocalDate.now());
            }

            applications.add(requestForReportOfPerson);
        }

        return applications;
    }

    public static RequestForReportOfPerson asModel(RequestForReportOfPersonDto requestForReportOfPersonDto) {
        if(requestForReportOfPersonDto == null) {
            return null;
        }

        RequestForReportOfPerson requestForReportOfPerson = new RequestForReportOfPerson();
        requestForReportOfPerson.setPerson(PersonOfReportMapper.asModel(requestForReportOfPersonDto.getPersonOfReport()));
        requestForReportOfPerson.setPeriodForReport(PeriodForReportDtoMapper.asModel(requestForReportOfPersonDto.getPeriodForReport()));
        requestForReportOfPerson.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(requestForReportOfPersonDto.getApplicantDataOfReport()));

        return requestForReportOfPerson;
    }

    public static GroupReportForPersonDto asDto(RequestForReportOfPerson application) {
        if(application == null) {
            return null;
        }

        RequestForReportOfPersonDto requestForReportOfPersonDto = new RequestForReportOfPersonDto();
        requestForReportOfPersonDto.setPersonOfReport(PersonOfReportMapper.asDto(application.getPerson()));
        requestForReportOfPersonDto.setPeriodForReport(PeriodForReportDtoMapper.asDto(application.getPeriodForReport()));

        PersonSubjectOfReportSectionDto personSubjectOfReportSectionDto = new PersonSubjectOfReportSectionDto();
        personSubjectOfReportSectionDto.getRequestsForReportOfPerson().add(requestForReportOfPersonDto);

        GroupReportForPersonDto groupReportForPersonDto = new GroupReportForPersonDto();
        groupReportForPersonDto.setPersonSubjectOfReportSection(personSubjectOfReportSectionDto);
        groupReportForPersonDto.setAppFormType(ApplicationType.REQUEST_FOR_REPORT_FOR_PERSON.getCode());
        groupReportForPersonDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDto(application.getApplicantData()));
        groupReportForPersonDto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return groupReportForPersonDto;
    }
}
