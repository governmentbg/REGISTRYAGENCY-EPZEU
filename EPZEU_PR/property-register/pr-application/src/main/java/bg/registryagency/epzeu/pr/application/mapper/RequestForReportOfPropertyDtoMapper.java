package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfProperty;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PeriodForReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PropertyOfReportMapper;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForPropertyDto;
import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfPropertyDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PropertySubjectOfReportSectionDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RequestForReportOfPropertyDtoMapper {

    public static List<BaseRequestForReport> asModels(GroupReportForPropertyDto groupDto) {
        if(groupDto == null) {
            return new ArrayList<>();
        }

        List<BaseRequestForReport> applications = new ArrayList<>();

        List<RequestForReportOfPropertyDto> requestsForReportOfPropertyDto = groupDto.getPropertySubjectOfReportSection().getRequestsForReportOfProperty();

        for (RequestForReportOfPropertyDto requestForReportOfPropertyDto : requestsForReportOfPropertyDto) {
            RequestForReportOfProperty requestForReportOfProperty = RequestForReportOfPropertyDtoMapper.asModel(requestForReportOfPropertyDto);
            requestForReportOfProperty.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(groupDto.getApplicantDataOfReport()));
            requestForReportOfProperty.setGdprAgreement(GdprAgreementDtoMapper.asModel(groupDto.getGdprAgreement()));

            if (requestForReportOfProperty.getPeriodForReport().getEndDate() == null) {
                requestForReportOfProperty.getPeriodForReport().setEndDate(LocalDate.now());
            }

            applications.add(requestForReportOfProperty);
        }

        return applications;
    }

    public static RequestForReportOfProperty asModel(RequestForReportOfPropertyDto dto) {
        if(dto == null) {
            return null;
        }

        var requestForReportOfProperty = new RequestForReportOfProperty();
        requestForReportOfProperty.setProperty(PropertyOfReportMapper.asModel(dto.getPropertyOfReport()));
        requestForReportOfProperty.setPeriodForReport(PeriodForReportDtoMapper.asModel(dto.getPeriodForReport()));
        requestForReportOfProperty.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(dto.getApplicantDataOfReport()));

        return requestForReportOfProperty;
    }

    public static GroupReportForPropertyDto asDto(RequestForReportOfProperty application) {
        if(application == null) {
            return null;
        }

        var requestForReportOfPropertyDto = new RequestForReportOfPropertyDto();
        requestForReportOfPropertyDto.setPropertyOfReport(PropertyOfReportMapper.asDto(application.getProperty()));
        requestForReportOfPropertyDto.setPeriodForReport(PeriodForReportDtoMapper.asDto(application.getPeriodForReport()));

        var propertySubjectOfReportSectionDto = new PropertySubjectOfReportSectionDto();
        propertySubjectOfReportSectionDto.getRequestsForReportOfProperty().add(requestForReportOfPropertyDto);

        var groupDto = new GroupReportForPropertyDto();
        groupDto.setPropertySubjectOfReportSection(propertySubjectOfReportSectionDto);
        groupDto.setAppFormType(ApplicationType.REQUEST_FOR_REPORT_FOR_PROPERTY.getCode());
        groupDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDto(application.getApplicantData()));
        groupDto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return groupDto;
    }
}
