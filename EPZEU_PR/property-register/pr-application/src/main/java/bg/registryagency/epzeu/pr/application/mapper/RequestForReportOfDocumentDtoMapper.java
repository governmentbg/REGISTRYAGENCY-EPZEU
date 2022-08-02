package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.RequestForReportOfDocument;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.DocumentOfReportDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.integration.api.application.GroupReportForDocumentDto;
import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfDocumentDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentSubjectOfReportSectionDto;

import java.util.ArrayList;
import java.util.List;

public class RequestForReportOfDocumentDtoMapper {

    public static List<BaseRequestForReport> asModels(GroupReportForDocumentDto groupDto) {
        if(groupDto == null) {
            return new ArrayList<>();
        }

        List<BaseRequestForReport> applications = new ArrayList<>();
        List<RequestForReportOfDocumentDto> requestForReportOfDocumentDtos = groupDto.getDocumentSubjectOfReportSection().getRequestsForReportOfDocument();

        for (RequestForReportOfDocumentDto requestForReportOfDocumentDto : requestForReportOfDocumentDtos) {
            RequestForReportOfDocument requestForReportOfPerson = RequestForReportOfDocumentDtoMapper.asModel(requestForReportOfDocumentDto);
            requestForReportOfPerson.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(groupDto.getApplicantDataOfReport()));
            requestForReportOfPerson.setGdprAgreement(GdprAgreementDtoMapper.asModel(groupDto.getGdprAgreement()));

            applications.add(requestForReportOfPerson);
        }

        return applications;
    }

    public static RequestForReportOfDocument asModel(RequestForReportOfDocumentDto dto) {
        if(dto == null) {
            return null;
        }

        var requestForReportOfDocument = new RequestForReportOfDocument();
        requestForReportOfDocument.setDocument(DocumentOfReportDtoMapper.asModel(dto.getDocument()));
        requestForReportOfDocument.setApplicantData(ApplicantDataOfReportDtoMapper.asModel(dto.getApplicantDataOfReport()));

        return requestForReportOfDocument;
    }

    public static GroupReportForDocumentDto asDto(RequestForReportOfDocument application) {
        if(application == null) {
            return null;
        }

        var dto = new RequestForReportOfDocumentDto();
        dto.setDocument(DocumentOfReportDtoMapper.asDto(application.getDocument()));

        var documentSectionDto = new DocumentSubjectOfReportSectionDto();
        documentSectionDto.getRequestsForReportOfDocument().add(dto);

        var groupDto = new GroupReportForDocumentDto();
        groupDto.setDocumentSubjectOfReportSection(documentSectionDto);
        groupDto.setAppFormType(ApplicationType.REQUEST_FOR_REPORT_FOR_DOCUMENT.getCode());
        groupDto.setApplicantDataOfReport(ApplicantDataOfReportDtoMapper.asDto(application.getApplicantData()));
        groupDto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return groupDto;
    }
}
