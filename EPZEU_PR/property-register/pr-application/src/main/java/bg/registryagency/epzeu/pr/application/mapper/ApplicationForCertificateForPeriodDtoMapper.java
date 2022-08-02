package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationContentType;
import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPeriod;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.CertificateDataTypeNomenclature;
import bg.registryagency.epzeu.pr.application.segment.PropertyData;
import bg.registryagency.epzeu.pr.application.segment.mapper.*;
import bg.registryagency.epzeu.pr.integration.api.application.*;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentsDto;
import org.springframework.util.StringUtils;

import java.util.stream.Collectors;


public class ApplicationForCertificateForPeriodDtoMapper {
    public static ApplicationForCertificateForPeriod asModel(ApplicationForCertificateForPeriodDto dto) {
        if(dto == null) {
            return null;
        }

        var application = new ApplicationForCertificateForPeriod();
        application.setInitialApplicationData(InitialApplicationDataDtoMapper.asModel(dto.getInitialApplicationData()));
        application.setApplicantData(IndividualDtoMapper.asModel(dto.getApplicantData()));
        application.setApplicationContentType(dto.getInitialApplicationData() != null && StringUtils.hasText(dto.getInitialApplicationData().getIncomingReauNumber())
            ? ApplicationContentType.CORRECTIVE : ApplicationContentType.INITIAL);
        application.setContactData(ContactDataDtoMapper.asModel(dto.getContactData()));
        application.setPeriodForCertificate(PeriodForCertificateDtoMapper.asModel(dto.getPeriodForCertificate()));
        application.setWayOfProvision(WayOfProvisionDtoMapper.asModel(dto.getWayOfProvision()));
        application.setGdprAgreement(GdprAgreementDtoMapper.asModel(dto.getGdprAgreement()));

        if(dto.getRequestedProperty().getType() == null || !StringUtils.hasText(dto.getRequestedProperty().getType().getId())) {
            application.setCertificateDataType(CertificateDataTypeNomenclature.PERSON);
            application.setRequestedPerson(PersonDtoMapper.asModel(dto.getRequestedPerson()));
        } else {
            application.setCertificateDataType(CertificateDataTypeNomenclature.PROPERTY);

            PropertyData propertyData = new PropertyData();
            propertyData.setCurrentOwners(OwnersDtoMapper.asModel(dto.getCurrentOwners()));
            propertyData.setPreviousOwners(OwnersDtoMapper.asModel(dto.getPreviousOwners()));
            propertyData.setRequestedProperty(PropertyDtoMapper.asModel(dto.getRequestedProperty()));

            application.setPropertyData(propertyData);
        }

        DocumentsDto documents = dto.getDocuments();
        if(documents != null && documents.getAttachedDocuments() != null && !documents.getAttachedDocuments().isEmpty()) {
            application.setAttachedDocuments(documents
                .getAttachedDocuments().stream()
                .map(attachedDocumentDto -> AttachedDocumentDtoMapper.asModel(attachedDocumentDto))
                .collect(Collectors.toList()));
        }

        return application;
    }

    public static ApplicationForCertificateForPeriodDto asDto(ApplicationForCertificateForPeriod application) {
        if(application == null) {
            return new ApplicationForCertificateForPeriodDto(true);
        }

        DocumentsDto documentsDto = new DocumentsDto(true);
        if(application.getAttachedDocuments() != null) {
            documentsDto.setAttachedDocuments(application.getAttachedDocuments().stream()
                .map(attachedDocument -> AttachedDocumentDtoMapper.asDto(attachedDocument))
                .collect(Collectors.toList()));
        }

        ApplicationForCertificateForPeriodDto dto = new ApplicationForCertificateForPeriodDto(false);
        dto.setApplicantData(IndividualDtoMapper.asDto(application.getApplicantData()));
        dto.setContactData(ContactDataDtoMapper.asDto(application.getContactData()));

        if(application.getPropertyData() == null || application.getPropertyData().getRequestedProperty() == null) {
            dto.setRequestedPerson(PersonDtoMapper.asDto(application.getRequestedPerson()));

            dto.setAppFormType(ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON.getCode());
        } else if(application.getPropertyData() != null && application.getPropertyData().getRequestedProperty() != null) {
            dto.setCurrentOwners(OwnersDtoMapper.asDto(application.getPropertyData().getCurrentOwners()));
            dto.setPreviousOwners(OwnersDtoMapper.asDto(application.getPropertyData().getPreviousOwners()));
            dto.setRequestedProperty(PropertyDtoMapper.asDto(application.getPropertyData().getRequestedProperty()));

            dto.setAppFormType(ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY.getCode());
        }

        dto.setInitialApplicationData(InitialApplicationDataDtoMapper.asDto(application.getInitialApplicationData()));
        dto.setPeriodForCertificate(PeriodForCertificateDtoMapper.asDto(application.getPeriodForCertificate()));
        dto.setWayOfProvision(WayOfProvisionDtoMapper.asDto(application.getWayOfProvision()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));
        dto.setDocuments(documentsDto);

        return dto;
    }
}
