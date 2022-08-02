package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationContentType;
import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPerson;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.mapper.*;
import bg.registryagency.epzeu.pr.integration.api.application.*;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentsDto;
import org.springframework.util.StringUtils;

import java.util.stream.Collectors;


public class ApplicationForCertificateForPersonDtoMapper {
    public static ApplicationForCertificateForPerson asModel(ApplicationForCertificateForPersonDto dto) {
        if (dto == null) {
            return null;
        }

        var application = new ApplicationForCertificateForPerson();
        application.setApplicationContentType(dto.getInitialApplicationData() != null && StringUtils.hasText(dto.getInitialApplicationData().getIncomingReauNumber())
            ? ApplicationContentType.CORRECTIVE : ApplicationContentType.INITIAL);
        application.setInitialApplicationData(InitialApplicationDataDtoMapper.asModel(dto.getInitialApplicationData()));
        application.setApplicantData(IndividualDtoMapper.asModel(dto.getApplicantData()));
        application.setRequestedPerson(PersonDtoMapper.asModel(dto.getRequestedPerson()));
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

    public static ApplicationForCertificateForPersonDto asDto(ApplicationForCertificateForPerson application) {
        if (application == null) {
            return new ApplicationForCertificateForPersonDto(true);
        }

        DocumentsDto documentsDto = new DocumentsDto(true);
        if(application.getAttachedDocuments() != null) {
            documentsDto.setAttachedDocuments(application.getAttachedDocuments().stream()
                .map(attachedDocument -> AttachedDocumentDtoMapper.asDto(attachedDocument))
                .collect(Collectors.toList()));
        }

        ApplicationForCertificateForPersonDto dto = new ApplicationForCertificateForPersonDto(false);
        dto.setAppFormType(ApplicationType.APPLICATION_CERTIFICATE_PERSON.getCode());
        dto.setInitialApplicationData(InitialApplicationDataDtoMapper.asDto(application.getInitialApplicationData()));
        dto.setApplicantData(IndividualDtoMapper.asDto(application.getApplicantData()));
        dto.setRequestedPerson(PersonDtoMapper.asDto(application.getRequestedPerson()));
        dto.setWayOfProvision(WayOfProvisionDtoMapper.asDto(application.getWayOfProvision()));
        dto.setContactData(ContactDataDtoMapper.asDto(application.getContactData()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));
        dto.setDocuments(documentsDto);

        return dto;
    }
}
