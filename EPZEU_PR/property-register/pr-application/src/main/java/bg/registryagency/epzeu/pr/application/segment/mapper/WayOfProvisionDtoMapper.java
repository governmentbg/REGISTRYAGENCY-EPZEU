package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DeliveryMethodNomenclature;
import bg.registryagency.epzeu.pr.application.segment.ServiceType;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvision;
import bg.registryagency.epzeu.pr.integration.api.application.segment.WayOfProvisionDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServiceTypeNom;
import org.springframework.util.StringUtils;

public class WayOfProvisionDtoMapper {
    public static WayOfProvision asModel(WayOfProvisionDto wayOfProvisionDto) {
        if(wayOfProvisionDto == null) {
            return null;
        }

        WayOfProvision wayOfProvision = new WayOfProvision();
        wayOfProvision.setIssuingAuthority(RegistryOfficeDtoMapper.asModel(wayOfProvisionDto.getIssuingAuthority()));

        if(wayOfProvisionDto.getServiceTypeId() != null) {
            wayOfProvision.setServiceTypeEpzeu(new ServiceType(wayOfProvisionDto.getServiceTypeId().toString(), wayOfProvisionDto.getServiceType()));
            wayOfProvision.setServiceTypeId(ServiceTypeNom.fromEpzeuId(wayOfProvisionDto.getServiceTypeId()).getPrId());
        }

        if(wayOfProvisionDto.getReceivingOffice() != null && StringUtils.hasText(wayOfProvisionDto.getReceivingOffice().getId())) {
            wayOfProvision.setReceivingOffice(RegistryOfficeDtoMapper.asModel(wayOfProvisionDto.getReceivingOffice()));
        }

        if(wayOfProvisionDto.getSelectedOnCornerDeliveryMethod() != null
            && wayOfProvisionDto.getSelectedOnCornerDeliveryMethod()
            && wayOfProvisionDto.getSelectedElectronicImageDeliveryMethod() != null
            && wayOfProvisionDto.getSelectedElectronicImageDeliveryMethod()) {

            wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.asDeliveryMethodType());
        } else if(wayOfProvisionDto.getSelectedOnCornerDeliveryMethod() != null
            && wayOfProvisionDto.getSelectedOnCornerDeliveryMethod()) {

            wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.ON_THE_COUNTER.asDeliveryMethodType());
        } else if(wayOfProvisionDto.getSelectedElectronicImageDeliveryMethod() != null
            && wayOfProvisionDto.getSelectedElectronicImageDeliveryMethod()) {

            wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.asDeliveryMethodType());
        }

        return wayOfProvision;
    }

    public static WayOfProvisionDto asDto(WayOfProvision wayOfProvision) {
        if(wayOfProvision == null) {
            return new WayOfProvisionDto(true);
        }

        WayOfProvisionDto dto = new WayOfProvisionDto(false);
        dto.setIssuingAuthority(RegistryOfficeDtoMapper.asDto(wayOfProvision.getIssuingAuthority()));

        dto.setReceivingOffice(RegistryOfficeDtoMapper.asDto(wayOfProvision.getReceivingOffice()));
        dto.setServiceTypeId(Integer.valueOf(wayOfProvision.getServiceTypeEpzeu().getId()));
        dto.setServiceType(wayOfProvision.getServiceTypeEpzeu().getName());

        if(DeliveryMethodNomenclature.ON_THE_COUNTER.getId().equals(wayOfProvision.getDeliveryMethodType().getId())
            || DeliveryMethodNomenclature.ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId().equals(wayOfProvision.getDeliveryMethodType().getId())) {
            dto.setSelectedOnCornerDeliveryMethod(true);
        }
        if(DeliveryMethodNomenclature.AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId().equals(wayOfProvision.getDeliveryMethodType().getId())
            || DeliveryMethodNomenclature.ON_THE_COUNTER_AND_AS_ELECTRONIC_IMAGE_OF_THE_PAPER_DOCUMENT.getId().equals(wayOfProvision.getDeliveryMethodType().getId())) {
            dto.setSelectedElectronicImageDeliveryMethod(true);
        }

        return dto;
    }
}
