package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationForCertifiedCopy;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.mapper.*;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForCertifiedCopyDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentsDto;

import java.util.stream.Collectors;


public class ApplicationForCertifiedCopyDtoMapper {
    public static ApplicationForCertifiedCopy asModel(ApplicationForCertifiedCopyDto dto) {
        if(dto == null) {
            return null;
        }

        var application = new ApplicationForCertifiedCopy();
        application.setApplicantData(ApplicantDataDtoMapper.asModel(dto.getApplicantData()));
        application.setServiceRecipient(ServiceRecipientDtoMapper.asModel(dto.getServiceRecipient()));
        application.setActRequestingACopy(ActRequestingACopyDtoMapper.asModel(dto.getActRequestingACopy()));
        application.setContactData(ContactDataDtoMapper.asModel(dto.getContactData()));
        application.setWayOfProvision(WayOfProvisionBaseDataDtoMapper.asModel(dto.getWayOfProvision()));
        application.setGdprAgreement(GdprAgreementDtoMapper.asModel(dto.getGdprAgreement()));

        DocumentsDto documents = dto.getDocuments();
        if(documents != null && documents.getAttachedDocuments() != null && !documents.getAttachedDocuments().isEmpty()) {
            application.setAttachedDocuments(documents
                .getAttachedDocuments().stream()
                .map(attachedDocumentDto -> AttachedDocumentDtoMapper.asModel(attachedDocumentDto))
                .collect(Collectors.toList()));
        }

        return application;
    }

    public static ApplicationForCertifiedCopyDto asDto(ApplicationForCertifiedCopy application) {
        if(application == null) {
            return new ApplicationForCertifiedCopyDto(true);
        }

        DocumentsDto documentsDto = new DocumentsDto(true);
        if(application.getAttachedDocuments() != null) {
            documentsDto.setAttachedDocuments(application.getAttachedDocuments().stream()
                .map(attachedDocument -> AttachedDocumentDtoMapper.asDto(attachedDocument))
                .collect(Collectors.toList()));
        }

        ApplicationForCertifiedCopyDto dto = new ApplicationForCertifiedCopyDto(false);
        dto.setAppFormType(ApplicationType.APPLICATION_CERTIFIED_COPY.getCode());
        dto.setApplicantData(ApplicantDataDtoMapper.asDto(application.getApplicantData()));
        dto.setServiceRecipient(ServiceRecipientDtoMapper.asDto(application.getServiceRecipient()));
        dto.setActRequestingACopy(ActRequestingACopyDtoMapper.asDto(application.getActRequestingACopy()));
        dto.setContactData(ContactDataDtoMapper.asDto(application.getContactData()));
        dto.setWayOfProvision(WayOfProvisionBaseDataDtoMapper.asDto(application.getWayOfProvision()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));
        dto.setDocuments(documentsDto);

        return dto;
    }
}
