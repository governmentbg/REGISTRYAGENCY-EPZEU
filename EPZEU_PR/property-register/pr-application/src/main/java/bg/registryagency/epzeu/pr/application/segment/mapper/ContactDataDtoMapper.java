package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ContactData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ContactDataDto;
import org.springframework.util.StringUtils;

public class ContactDataDtoMapper {
    public static ContactData asModel(ContactDataDto contactDataDto) {
        if(contactDataDto == null) {
            return null;
        }

        ContactData contactData = new ContactData();
        contactData.setAppEmailAddress(contactDataDto.getAppEmailAddress());
        contactData.setPhone(contactDataDto.getPhone());
        contactData.setAddress(AddressDtoMapper.asModel(contactDataDto.getAddress()));
        contactData.setAppAddressee(StringUtils.hasText(contactDataDto.getAppAddressee()) ? contactDataDto.getAppAddressee() : null);

        return contactData;
    }

    public static ContactDataDto asDto(ContactData contactData) {
        if(contactData == null) {
            return new ContactDataDto(true);
        }

        ContactDataDto dto = new ContactDataDto(false);
        dto.setAppEmailAddress(contactData.getAppEmailAddress());
        dto.setPhone(contactData.getPhone());
        dto.setAddress(AddressDtoMapper.asDto(contactData.getAddress()));
        dto.setAppAddressee(contactData.getAppAddressee());

        return dto;
    }
}
