package bg.registryagency.epzeu.pr.application.validator.segment;

import bg.registryagency.epzeu.pr.application.segment.Address;
import bg.registryagency.epzeu.pr.application.segment.Ekatte;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.application.validator.ValidationParamKey;
import bg.registryagency.epzeu.pr.application.validator.Validator;
import bg.registryagency.epzeu.pr.integration.cache.EkatteAreaNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.cache.EkatteSettlementNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class AddressValidator implements Validator {

    private final LabelMessageSource labelMessageSource;

    private final EkatteAreaNomenclatureCache areaNomenclatureCache;
    private final EkatteSettlementNomenclatureCache settlementNomenclatureCache;

    @Override
    public List<ApplicationError> validate(Object objectToValidate, Map<ValidationParamKey, Object> params) {

        List<ApplicationError> errors = new ArrayList<>();

        Address address = (Address) objectToValidate;

        if(address != null && !isEmptyAddress(address)) {
            if(params != null && params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES) != null
                && (Boolean) params.get(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES)
                && address.getSettlement() != null
                && settlementNomenclatureCache.get(address.getSettlement().getCode()) == null) {

                errors.add(new ApplicationError("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I", labelMessageSource.getMessage("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")));

                //Construct path to field where is selected already deleted nomenclature
                var pathToError = params.get(ValidationParamKey.PATH_TO_ERROR) + Validator.errorPathDelimiter +
                    labelMessageSource.getMessage("GL_PLACE_L") + Validator.errorMessageDelimiter +
                    address.getSettlement().getName();

                errors.add(new ApplicationError("PR_APP_00010_E", pathToError));
            }

            if (!(requiredParamsForFirstValidation(address) || requiredParamsForSecondValidation(address))) {
                errors.add(new ApplicationError("PR_APP_00010_E", labelMessageSource.getMessage("PR_APP_00010_E")));
            }
        }

        return errors;
    }

      private Boolean isEmptyAddress(Address address) {
          if(!isEmptyValue(address.getSettlement()) ||  !isEmptyValue(address.getArea()) ||
              !isEmptyValue(address.getMunicipality()) || !isEmptyValue(address.getRegion()) ||
              !isEmptyValue(address.getPostCode()) || !isEmptyValue(address.getStreet()) ||
              !isEmptyValue(address.getHousingEstate()) || !isEmptyValue(address.getStreetNumber()) ||
              !isEmptyValue(address.getBlock()) || !isEmptyValue(address.getEntrance()) ||
              !isEmptyValue(address.getFloor()) || !isEmptyValue(address.getApartment())) {

              return false;
          }
          return true;
      }

    private Boolean requiredParamsForFirstValidation(Address address) {
        if(commonParamsForBothValidations(address) && !isEmptyValue(address.getHousingEstate()) &&
            !isEmptyValue(address.getBlock()) && !isEmptyValue(address.getEntrance()) &&
            !isEmptyValue(address.getFloor()) && !isEmptyValue(address.getApartment()) &&
            isEmptyValue(address.getStreet()) && isEmptyValue(address.getStreetNumber())) {

            return true;
        }
        return false;
    }

    private Boolean requiredParamsForSecondValidation(Address address) {
        if(commonParamsForBothValidations(address) && !isEmptyValue(address.getStreet()) &&
            !isEmptyValue(address.getStreetNumber()) && isEmptyValue(address.getHousingEstate()) &&
            isEmptyValue(address.getBlock())) {

            return true;
        }
        return false;
    }

    private Boolean commonParamsForBothValidations(Address address) {
        if(!isEmptyValue(address.getSettlement()) &&  (hasArea(address.getSettlement()) ? isValidArea(address): true) &&
            !isEmptyValue(address.getMunicipality()) && !isEmptyValue(address.getRegion()) &&
            !isEmptyValue(address.getPostCode())) {

            return true;
        }
        return false;
    }

    private Boolean hasArea(Ekatte settlement) {
        Integer settlementId = settlementNomenclatureCache.get(settlement.getCode()) != null ? settlementNomenclatureCache.get(settlement.getCode()).getId() : null;

       return settlementId != null && areaNomenclatureCache.asMap().values().stream().anyMatch(a -> a.getSettlementID().equals(settlementId));
    }

    private Boolean isValidArea(Address address) {
        if(!isEmptyValue(address.getArea())) {
            return areaNomenclatureCache.asMap().values().stream().anyMatch(a -> a.getEkatteCode().equals(address.getArea().getCode()));
        }
        return false;
    }

   private Boolean isEmptyValue(Object value) {
       if(value instanceof Integer) {
            return false;
       } else if (value instanceof Ekatte) {
           return isStringNullOrEmpty(((Ekatte) value).getCode()) && isStringNullOrEmpty(((Ekatte) value).getName());
       } else {
           return isStringNullOrEmpty((String) value);
       }
   }

   private Boolean isStringNullOrEmpty(String str) {
        return str == null || str.equals("");
   }
}
