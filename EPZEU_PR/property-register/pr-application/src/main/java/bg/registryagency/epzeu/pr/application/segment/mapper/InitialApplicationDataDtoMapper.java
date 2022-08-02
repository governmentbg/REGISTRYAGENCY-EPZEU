package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.InitialApplicationData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.InitialApplicationDataDto;
import org.springframework.util.StringUtils;

public class InitialApplicationDataDtoMapper {
    public static InitialApplicationData asModel(InitialApplicationDataDto dto) {
        if (dto == null || !StringUtils.hasText(dto.getIncomingReauNumber()) && dto.getRegisterNumber() == null) {
            return null;
        }

        InitialApplicationData initialApplicationData = new InitialApplicationData();
        initialApplicationData.setIncomingReauNumber(dto.getIncomingReauNumber());
        initialApplicationData.setRegisterNumber(dto.getRegisterNumber());
        initialApplicationData.setRegisterDate(dto.getRegisterDate());
        initialApplicationData.setRegisterType(RegisterTypeDtoMapper.asModel(dto.getRegisterType()));
        initialApplicationData.setRegistryOffice(RegistryOfficeDtoMapper.asModel(dto.getRegistryOffice()));

        return initialApplicationData;
    }

    public static InitialApplicationDataDto asDto(InitialApplicationData initialApplicationData) {
        if (initialApplicationData == null) {
            return new InitialApplicationDataDto(true);
        }

        InitialApplicationDataDto dto = new InitialApplicationDataDto(false);
        dto.setIncomingReauNumber(initialApplicationData.getIncomingReauNumber());
        dto.setRegisterNumber(initialApplicationData.getRegisterNumber());
        dto.setRegisterDate(initialApplicationData.getRegisterDate());
        dto.setRegisterType(RegisterTypeDtoMapper.asDto(initialApplicationData.getRegisterType()));
        dto.setRegistryOffice(RegistryOfficeDtoMapper.asDto(initialApplicationData.getRegistryOffice()));

        return dto;
    }
}
