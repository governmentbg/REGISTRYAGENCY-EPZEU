package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationContentType;
import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForProperty;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.mapper.*;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForCertificateForPropertyDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentsDto;
import org.springframework.util.StringUtils;

import java.util.stream.Collectors;


public class ApplicationForCertificateForPropertyDtoMapper {
    public static ApplicationForCertificateForProperty asModel(ApplicationForCertificateForPropertyDto dto) {
        if (dto == null) {
            return null;
        }

        var application = new ApplicationForCertificateForProperty();
        application.setApplicationContentType(dto.getInitialApplicationData() != null && StringUtils.hasText(dto.getInitialApplicationData().getIncomingReauNumber())
            ? ApplicationContentType.CORRECTIVE : ApplicationContentType.INITIAL);
        application.setInitialApplicationData(InitialApplicationDataDtoMapper.asModel(dto.getInitialApplicationData()));
        application.setApplicantData(IndividualDtoMapper.asModel(dto.getApplicantData()));
        application.setRequestedProperty(PropertyDtoMapper.asModel(dto.getRequestedProperty()));
        application.setCurrentOwners(OwnersDtoMapper.asModel(dto.getCurrentOwners()));
        application.setPreviousOwners(OwnersDtoMapper.asModel(dto.getPreviousOwners()));
        application.setWayOfProvision(WayOfProvisionDtoMapper.asModel(dto.getWayOfProvision()));
        application.setContactData(ContactDataDtoMapper.asModel(dto.getContactData()));
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

    public static ApplicationForCertificateForPropertyDto asDto(ApplicationForCertificateForProperty application) {
        if (application == null) {
            return new ApplicationForCertificateForPropertyDto(true);
        }

        DocumentsDto documentsDto = new DocumentsDto(true);
        if(application.getAttachedDocuments() != null) {
            documentsDto.setAttachedDocuments(application.getAttachedDocuments().stream()
                .map(attachedDocument -> AttachedDocumentDtoMapper.asDto(attachedDocument))
                .collect(Collectors.toList()));
        }
        ApplicationForCertificateForPropertyDto dto = new ApplicationForCertificateForPropertyDto(false);
        dto.setInitialApplicationData(InitialApplicationDataDtoMapper.asDto(application.getInitialApplicationData()));
        dto.setAppFormType(ApplicationType.APPLICATION_CERTIFICATE_PROPERTY.getCode());
        dto.setApplicantData(IndividualDtoMapper.asDto(application.getApplicantData()));
        dto.setRequestedProperty(PropertyDtoMapper.asDto(application.getRequestedProperty()));
        dto.setCurrentOwners(OwnersDtoMapper.asDto(application.getCurrentOwners()));
        dto.setPreviousOwners(OwnersDtoMapper.asDto(application.getPreviousOwners()));
        dto.setWayOfProvision(WayOfProvisionDtoMapper.asDto(application.getWayOfProvision()));
        dto.setContactData(ContactDataDtoMapper.asDto(application.getContactData()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));
        dto.setDocuments(documentsDto);

        return dto;
    }
}
