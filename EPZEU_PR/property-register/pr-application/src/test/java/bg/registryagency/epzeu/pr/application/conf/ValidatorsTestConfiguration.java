package bg.registryagency.epzeu.pr.application.conf;

import bg.registryagency.epzeu.pr.application.LabelMessageSourceMock;
import bg.registryagency.epzeu.pr.integration.cache.*;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AreaDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EkatteDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.SpecialAccessTypeDto;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServicePriceDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ComponentScan(value = {"bg.registryagency.epzeu.pr.application.validator"})
public class ValidatorsTestConfiguration {

    @Bean
    public EkatteSettlementNomenclatureCache ekatteSettlementNomenclatureCache() {
        EkatteSettlementNomenclatureCache ekatteSettlementNomenclatureCache = new EkatteSettlementNomenclatureCache();

        EkatteDto validSettlementTestDto = new EkatteDto();
        validSettlementTestDto.setId(1234);   //valid test code
        ekatteSettlementNomenclatureCache.put("10135", validSettlementTestDto); //valid code for Sofia

        EkatteDto validSettlementTestDtoWithoutArea = new EkatteDto();
        validSettlementTestDtoWithoutArea.setId(4578);   //valid test code
        ekatteSettlementNomenclatureCache.put("56252", validSettlementTestDtoWithoutArea);

        return ekatteSettlementNomenclatureCache;
    }

    @Bean
    public EkatteAreaNomenclatureCache ekatteAreaNomenclatureCache() {
        EkatteAreaNomenclatureCache ekatteAreaNomenclatureCache = new EkatteAreaNomenclatureCache();

        AreaDto areaValidTestDto = new AreaDto();
        areaValidTestDto.setEkatteCode("10135-03");
        areaValidTestDto.setSettlementID(1234);
        ekatteAreaNomenclatureCache.put(1, areaValidTestDto);

        return ekatteAreaNomenclatureCache;
    }

    @Bean
    public ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache() {
        ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache = new ApplicationTypeReauNomenclatureCache();
        ApplicationTypeReauNomDto dto = new ApplicationTypeReauNomDto();

        List<ServicePriceDto> servicePrices = new ArrayList<>() {{
            ServicePriceDto validServiceDto = new ServicePriceDto();
            validServiceDto.setPrServiceTypeID("10001100000000016576"); //valid test id
            add(validServiceDto);

            ServicePriceDto invalidServiceDto = new ServicePriceDto();
            invalidServiceDto.setPrServiceTypeID("10001100000000016577");
            add(invalidServiceDto);
        }};

        dto.setPrices(servicePrices);
        applicationTypeNomenclatureCache.put(43, dto); // 43 - code for ApplicationForCertificateForPerson from ApplicationType

        return applicationTypeNomenclatureCache;
    }

    @Bean
    public PlaceNomenclatureCache placeNomenclatureCache() {
        PlaceNomenclatureCache placeNomenclatureCache = new PlaceNomenclatureCache();

        PlaceNomenclaturePrDto settlement = new PlaceNomenclaturePrDto();
        settlement.setEkatte(68134);

        placeNomenclatureCache.put("10000800000000014665", settlement);

        return placeNomenclatureCache;
    }

    @Bean
    public SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache() {
        SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache = new SpecialAccessTypeNomenclatureCache();

        SpecialAccessTypeDto specialAccessTypeDto = new SpecialAccessTypeDto();
        specialAccessTypeDto.setName("Служител на ДАНС");  //valid specialAccessTypeName

        specialAccessTypeNomenclatureCache.put(1234, specialAccessTypeDto); //random key

        return specialAccessTypeNomenclatureCache;
    }

    @Bean
    public CountriesCache countriesCache() {
        CountriesCache countriesCache = new CountriesCache();
        CountryDto countryDto = new CountryDto();
        countryDto.setName("БЪЛГАРИЯ");
        countriesCache.put((short)100, countryDto);
        return countriesCache;
    }

    @Bean
    public LabelMessageSource labelMessageSource() {
        return new LabelMessageSourceMock(null);
    }

    @Bean
    public PropertyTypeNomenclatureCache propertyTypeNomenclatureCache() {
        return new PropertyTypeNomenclatureCache();
    }

    @Bean
    public RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache() {
        RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache = new RegistryOfficeNomenclatureCache();

        RegistryOfficeDto registryOfficeDto = new RegistryOfficeDto();
        registryOfficeDto.setName("София");
        registryOfficeNomenclatureCache.put("10000900000000015838", registryOfficeDto);

        return registryOfficeNomenclatureCache;
    }
}
