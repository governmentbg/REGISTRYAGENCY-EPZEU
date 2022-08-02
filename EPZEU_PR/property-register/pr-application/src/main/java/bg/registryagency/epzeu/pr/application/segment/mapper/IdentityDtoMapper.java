package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class IdentityDtoMapper {

    public static Identity asModel(String dto) {
        if(!StringUtils.hasText(dto)) {
            return null;
        }

        Identity identity = new Identity();
        if(ValidatorHelper.validateEgn(dto)) {
            identity.setEgn(dto);
            return identity;
        } else if(ValidatorHelper.validateLnch(dto)) {
            identity.setLnch(dto);
            return identity;
        } else if(ValidatorHelper.validateBirthDate(dto)) {
            try {
                identity.setBirthDate(LocalDate.parse(dto, DateTimeFormatter.BASIC_ISO_DATE));
            } catch (DateTimeParseException e) {
                return null;
            }
            return identity;
        }

        return null;
    }

    public static String asDto(Identity identity) {
        if(identity == null) {
            return null;
        }

        if(StringUtils.hasText(identity.getEgn())) {
            return identity.getEgn();
        } else if(StringUtils.hasText(identity.getLnch())) {
            return identity.getLnch();
        } else if(identity.getBirthDate() != null) {
            return identity.getBirthDate().format(DateTimeFormatter.BASIC_ISO_DATE);
        }

        return null;
    }
}
