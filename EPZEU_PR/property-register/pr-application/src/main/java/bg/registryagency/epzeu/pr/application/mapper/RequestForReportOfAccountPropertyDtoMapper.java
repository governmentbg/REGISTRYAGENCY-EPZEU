package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfAccountProperty;
import bg.registryagency.epzeu.pr.application.segment.mapper.AccountPropertyOfReportMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.PropertyOfReportMapper;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForAccountPropertyDto;
import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfAccountPropertyDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.AccountPropertySubjectOfReportSectionDto;

import java.util.ArrayList;
import java.util.List;

public class RequestForReportOfAccountPropertyDtoMapper {

    public static List<BaseRequestForReport> asModels(GroupReportForAccountPropertyDto groupDto) {
        if(groupDto == null) {
            return new ArrayList<>();
        }

        List<BaseRequestForReport> applications = new ArrayList<>();

        var requestForReportOfAccountPropertyDtos = groupDto.getAccountPropertySubjectOfReportSection().getRequestsForReportOfAccountProperty();

        for (RequestForReportOfAccountPropertyDto dto : requestForReportOfAccountPropertyDtos) {
            var requestForReportOfAccountProperty = RequestForReportOfAccountPropertyDtoMapper.asModel(dto);
            requestForReportOfAccountProperty.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(groupDto.getApplicantDataOfReport()));
            requestForReportOfAccountProperty.setGdprAgreement(GdprAgreementDtoMapper.asModel(groupDto.getGdprAgreement()));

            applications.add(requestForReportOfAccountProperty);
        }

        return applications;
    }

    public static RequestForReportOfAccountProperty asModel(RequestForReportOfAccountPropertyDto dto) {
        if(dto == null) {
            return null;
        }

        var requestForReportOfAccountProperty = new RequestForReportOfAccountProperty();
        requestForReportOfAccountProperty.setAccountProperty(AccountPropertyOfReportMapper.asModel(dto.getAccountPropertyOfReport()));
        requestForReportOfAccountProperty.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(dto.getApplicantDataOfReport()));

        return requestForReportOfAccountProperty;
    }

    public static GroupReportForAccountPropertyDto asDto(RequestForReportOfAccountProperty application) {
        if(application == null) {
            return null;
        }

        var dto = new RequestForReportOfAccountPropertyDto();
        dto.setAccountPropertyOfReport(AccountPropertyOfReportMapper.asDto(application.getAccountProperty()));

        var propertySubjectOfReportSectionDto = new AccountPropertySubjectOfReportSectionDto();
        propertySubjectOfReportSectionDto.getRequestsForReportOfAccountProperty().add(dto);

        var groupDto = new GroupReportForAccountPropertyDto();
        groupDto.setAccountPropertySubjectOfReportSection(propertySubjectOfReportSectionDto);
        groupDto.setAppFormType(ApplicationType.REQUEST_FOR_REPORT_FOR_ACCOUNT_PROPERTY.getCode());
        groupDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDto(application.getApplicantData()));
        groupDto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return groupDto;
    }
}
