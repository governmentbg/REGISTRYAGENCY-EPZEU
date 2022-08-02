package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DeliveryMethodNomenclature;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvisionBaseData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.WayOfProvisionBaseDataDto;

public class WayOfProvisionBaseDataDtoMapper {
    public static WayOfProvisionBaseData asModel(WayOfProvisionBaseDataDto wayOfProvisionDto) {
        if(wayOfProvisionDto == null) {
            return null;
        }

        WayOfProvisionBaseData wayOfProvision = new WayOfProvisionBaseData();
        wayOfProvision.setIssuingAuthority(RegistryOfficeDtoMapper.asModel(wayOfProvisionDto.getIssuingAuthority()));
        wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.asDeliveryMethodType());

        return wayOfProvision;
    }

    public static WayOfProvisionBaseDataDto asDto(WayOfProvisionBaseData wayOfProvision) {
        if(wayOfProvision == null) {
            return new WayOfProvisionBaseDataDto(true);
        }

        WayOfProvisionBaseDataDto dto = new WayOfProvisionBaseDataDto(false);
        dto.setIssuingAuthority(RegistryOfficeDtoMapper.asDto(wayOfProvision.getIssuingAuthority()));

        return dto;
    }
}
