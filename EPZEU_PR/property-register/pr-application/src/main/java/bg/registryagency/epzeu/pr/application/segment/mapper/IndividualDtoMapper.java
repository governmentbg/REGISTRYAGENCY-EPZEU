package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Individual;
import bg.registryagency.epzeu.pr.integration.api.application.segment.IndividualDto;
import org.springframework.util.StringUtils;

public class IndividualDtoMapper {
    public static Individual asModel(IndividualDto dto) {
        if(dto == null) {
            return null;
        }

        Individual individual = new Individual();
        individual.setPersonNationality(CountryDtoMapper.asModel(dto.getPersonNationality()));
        individual.setIdentity(IdentityDtoMapper.asModel(dto.getIdentity()));
        individual.setName(NameDtoMapper.asModel(dto.getName()));
        individual.setBulstat(StringUtils.hasText(dto.getBulstat()) ? dto.getBulstat() : null);

        if(StringUtils.hasText(dto.getBirthPlace().getCountry())) {
            individual.setBirthPlace(BirthPlaceDtoMapper.asModel(dto.getBirthPlace()));
        }

        return individual;
    }

    public static IndividualDto asDto(Individual individual) {
        if(individual == null) {
            return new IndividualDto(true);
        }

        IndividualDto dto = new IndividualDto(false);
        dto.setPersonNationality(CountryDtoMapper.asDto(individual.getPersonNationality()));
        dto.setIdentity(IdentityDtoMapper.asDto(individual.getIdentity()));
        dto.setName(NameDtoMapper.asDto(individual.getName()));
        dto.setBirthPlace(BirthPlaceDtoMapper.asDto(individual.getBirthPlace()));
        dto.setBulstat(individual.getBulstat());

        return dto;
    }
}
