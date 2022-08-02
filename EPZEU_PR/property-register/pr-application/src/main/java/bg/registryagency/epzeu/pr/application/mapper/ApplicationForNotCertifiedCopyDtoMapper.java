package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationForNotCertifiedCopy;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.mapper.*;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForNotCertifiedCopyDto;


public class ApplicationForNotCertifiedCopyDtoMapper {
    public static ApplicationForNotCertifiedCopy asModel(ApplicationForNotCertifiedCopyDto dto) {
        if(dto == null) {
            return null;
        }

        var application = new ApplicationForNotCertifiedCopy();
        application.setApplicantData(IndividualDtoMapper.asModel(dto.getApplicantData()));
        application.setActRequestingACopy(ActRequestingACopyDtoMapper.asModel(dto.getActRequestingACopy()));
        application.setContactData(ContactDataDtoMapper.asModel(dto.getContactData()));
        application.setWayOfProvision(WayOfProvisionBaseDataDtoMapper.asModel(dto.getWayOfProvision()));
        application.setGdprAgreement(GdprAgreementDtoMapper.asModel(dto.getGdprAgreement()));

        return application;
    }

    public static ApplicationForNotCertifiedCopyDto asDto(ApplicationForNotCertifiedCopy application) {
        if(application == null) {
            return new ApplicationForNotCertifiedCopyDto(true);
        }

        var dto = new ApplicationForNotCertifiedCopyDto(false);
        dto.setAppFormType(ApplicationType.APPLICATION_NOT_CERTIFIED_COPY.getCode());
        dto.setApplicantData(IndividualDtoMapper.asDto(application.getApplicantData()));
        dto.setActRequestingACopy(ActRequestingACopyDtoMapper.asDto(application.getActRequestingACopy()));
        dto.setContactData(ContactDataDtoMapper.asDto(application.getContactData()));
        dto.setWayOfProvision(WayOfProvisionBaseDataDtoMapper.asDto(application.getWayOfProvision()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return dto;
    }
}
