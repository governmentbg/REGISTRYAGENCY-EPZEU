package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ServiceRecipient;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ServiceRecipientDto;
import org.springframework.util.StringUtils;

public class ServiceRecipientDtoMapper {
    public static ServiceRecipient asModel(ServiceRecipientDto dto) {
        if(dto == null) {
            return null;
        }

        ServiceRecipient serviceRecipient = new ServiceRecipient();
        serviceRecipient.setApplicantCategory(ApplicantCategoryDtoMapper.asModel(dto.getApplicantCategory()));
        serviceRecipient.setPerson(PersonDtoMapper.asModel(dto.getPerson()));
        serviceRecipient.setDataForAnOfficial(StringUtils.hasText(dto.getDataForAnOfficial()) ? dto.getDataForAnOfficial() : null);
        serviceRecipient.setSpecialAccessType(StringUtils.hasText(dto.getSpecialAccessType()) ? dto.getSpecialAccessType() : null);

        return serviceRecipient;
    }

    public static ServiceRecipientDto asDto(ServiceRecipient serviceRecipient) {
        if (serviceRecipient == null) {
            return new ServiceRecipientDto(true);
        }

        ServiceRecipientDto dto = new ServiceRecipientDto(false);
        dto.setApplicantCategory(ApplicantCategoryDtoMapper.asDto(serviceRecipient.getApplicantCategory()));
        dto.setDataForAnOfficial(serviceRecipient.getDataForAnOfficial());
        dto.setPerson(PersonDtoMapper.asDto(serviceRecipient.getPerson()));
        dto.setSpecialAccessType(serviceRecipient.getSpecialAccessType());

        return dto;
    }
}
