package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.application.segment.Person;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PersonDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import org.springframework.util.StringUtils;

public class PersonDtoMapper {
    public static Person asModel(PersonDto personDto) {
        if (personDto == null) {
            return null;
        }

        Person person = new Person();

        // first set the default value
        if(personDto.getIndividual() != null) {
            person.setType(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL);
        } else {
            person.setType(Person.PropertyRegisterPersonTypeNomenclature.LEGAL_ENTITY);
        }

        if(PersonTypeNomenclature.fromInteger(personDto.getType()) == PersonTypeNomenclature.INDIVIDUAL) {
//            person.setType(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL);
            person.setIndividual(IndividualDtoMapper.asModel(personDto.getIndividual()));

            Identity identity = person.getIndividual().getIdentity();

            if(identity != null) {
                if (StringUtils.hasText(identity.getEgn())) {
                    person.setType(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL);
                } else if (StringUtils.hasText(identity.getLnch())) {
                    person.setType(Person.PropertyRegisterPersonTypeNomenclature.FOREIGN_PERSON_WITH_LNCH);
                } else if (identity.getBirthDate() != null) {
                    person.setType(Person.PropertyRegisterPersonTypeNomenclature.FOREIGN_PERSON_WITHOUT_LNCH);
                }
            }
        } else {
            person.setLegalEntity(LegalEntityDtoMapper.asModel(personDto.getLegalEntity()));

            if(person.getLegalEntity().getCountry().getCode() == ApplicationConstants.COUNTRY_BULGARIA_CODE) {
                person.setType(Person.PropertyRegisterPersonTypeNomenclature.LEGAL_ENTITY);
            } else {
                person.setType(Person.PropertyRegisterPersonTypeNomenclature.LEGAL_ENTITY_WITHOUT_ID);
            }
        }

        return person;
    }

    public static PersonDto asDto(Person person) {
        if (person == null) {
            return new PersonDto(true);
        }

        PersonDto dto = new PersonDto(false);

        if (person.getIndividual() != null) {
            dto.setIndividual(IndividualDtoMapper.asDto(person.getIndividual()));
            dto.setType(PersonTypeNomenclature.INDIVIDUAL.getKey());
        }
        if (person.getLegalEntity() != null) {
            dto.setLegalEntity(LegalEntityDtoMapper.asDto(person.getLegalEntity()));
            dto.setType(PersonTypeNomenclature.LEGAL_ENTITY.getKey());
        }

        return dto;
    }
}
