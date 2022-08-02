package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInDoubleIncomingRegister;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DataForRegistrationOfDocumentInDoubleIncomingRegisterDto;

public class DataForRegistrationOfDocumentInDoubleIncomingRegisterDtoMapper {
    public static DataForRegistrationOfDocumentInDoubleIncomingRegister asModel(DataForRegistrationOfDocumentInDoubleIncomingRegisterDto dto) {
        if(dto == null) {
            return null;
        }

        var data = new DataForRegistrationOfDocumentInDoubleIncomingRegister();
        data.setDoubleIncomingRegisterNumber(dto.getDoubleIncomingRegisterNumber());
        data.setYear(dto.getYear());

        return data;
    }

    public static DataForRegistrationOfDocumentInDoubleIncomingRegisterDto asDto(DataForRegistrationOfDocumentInDoubleIncomingRegister data) {
        if(data == null) {
            return new DataForRegistrationOfDocumentInDoubleIncomingRegisterDto();
        }

        var dto = new DataForRegistrationOfDocumentInDoubleIncomingRegisterDto();
        dto.setDoubleIncomingRegisterNumber(data.getDoubleIncomingRegisterNumber());
        dto.setYear(data.getYear());

        return dto;
    }
}
