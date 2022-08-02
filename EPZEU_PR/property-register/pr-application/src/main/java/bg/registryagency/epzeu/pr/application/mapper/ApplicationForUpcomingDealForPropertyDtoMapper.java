package bg.registryagency.epzeu.pr.application.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationForUpcomingDealForProperty;
import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.segment.mapper.ApplicantDataDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.GdprAgreementDtoMapper;
import bg.registryagency.epzeu.pr.application.segment.mapper.UpcomingDealForPropertyDtoMapper;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationForUpcomingDealForPropertyDto;


public class ApplicationForUpcomingDealForPropertyDtoMapper {
    public static ApplicationForUpcomingDealForProperty asModel(ApplicationForUpcomingDealForPropertyDto dto) {
        if(dto == null) {
            return null;
        }

        var application = new ApplicationForUpcomingDealForProperty();
        application.setApplicantData(ApplicantDataDtoMapper.asModel(dto.getApplicantData()));
        application.setUpcomingDealForProperty(UpcomingDealForPropertyDtoMapper.asModel(dto.getUpcomingDealForProperty()));
        application.setGdprAgreement(GdprAgreementDtoMapper.asModel(dto.getGdprAgreement()));

        return application;
    }

    public static ApplicationForUpcomingDealForPropertyDto asDto(ApplicationForUpcomingDealForProperty application) {
        if(application == null) {
            return new ApplicationForUpcomingDealForPropertyDto(true);
        }

        ApplicationForUpcomingDealForPropertyDto dto = new ApplicationForUpcomingDealForPropertyDto(false);
        dto.setAppFormType(ApplicationType.APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY.getCode());
        dto.setApplicantData(ApplicantDataDtoMapper.asDto(application.getApplicantData()));
        dto.setUpcomingDealForProperty(UpcomingDealForPropertyDtoMapper.asDto(application.getUpcomingDealForProperty()));
        dto.setGdprAgreement(GdprAgreementDtoMapper.asDto(application.getGdprAgreement()));

        return dto;
    }
}
