package bg.registryagency.epzeu.pr.integration.conf;

public interface ApplicationConstants {
    //Default language code
    String LANGUAGE_DEFAULT = "bg";//TODO default language is get from Languages Nomenclature
    //Default language code
    short COUNTRY_BULGARIA_CODE = 100;
    //Language codes length
    int LANGUAGE_CODE_LENGTH = 2;
    //Language cookie name
    String LANGUAGE_COOKIE_NAME = "currentLang";
    //Session id cookie name
    String SESSION_ID_COOKIE_NAME = "EPZEUSessionID";
    //Property Register id in EPZEU
    int REGISTER_ID = 2;
    //Property Register Module id in EPZEU
    int MODULE_ID = 3;
    //Base api path
    String BASE_API_PATH = "/api";
    //Local development on local machine
    String SPRING_PROFILE_DEVELOPMENT = "dev";
    //Development profile on virtual machine
    String SPRING_PROFILE_DEVELOPMENT_VM = "dev-vm"; //Never used
    //Quality Assurance profile
    String SPRING_PROFILE_QA = "qa"; //Never used
    //Staging profile
    String SPRING_PROFILE_STAGING = "staging"; //Never used
    //Production profile
    String SPRING_PROFILE_PRODUCTION = "prod";
    //TODO move these two fields in own constants which are related with additional json field names
    //Name of json field where application's REAU number is stored, it is used when read raw json
    String ADDITIONAL_DATA_INCOMING_REAU_NUMBER = "incomingReauNumber";
    //Name of json field where application's REAU number is stored, it is used when read raw json
    String ADDITIONAL_DATA_INITIAL_APP_DOCUMENTS = "initialApplicationDocuments";

    String ADDITIONAL_DATA_LAST_APPLICATION_FOR_CORRECTION_IDENTIFIER = "lastApplicationForCorrectionIdentifier";
}
