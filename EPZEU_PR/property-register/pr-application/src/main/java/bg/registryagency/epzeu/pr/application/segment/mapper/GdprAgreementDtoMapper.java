package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.GdprAgreement;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;

public class GdprAgreementDtoMapper {
    public static GdprAgreement asModel(GdprAgreementDto dto) {
        if(dto == null) {
            return null;
        }

        GdprAgreement gdprAgreement = new GdprAgreement();
        gdprAgreement.setGdprAgreementText(dto.getGdprAgreementText());
        gdprAgreement.setGdprAgreementAcceptance(dto.getGdprAgreementAcceptance());

        return gdprAgreement;
    }

    public static GdprAgreementDto asDto(GdprAgreement gdprAgreement) {
        if(gdprAgreement == null) {
            return new GdprAgreementDto();
        }

        GdprAgreementDto dto = new GdprAgreementDto();
        dto.setGdprAgreementText(gdprAgreement.getGdprAgreementText());
        dto.setGdprAgreementAcceptance(gdprAgreement.getGdprAgreementAcceptance());

        return dto;
    }
}
