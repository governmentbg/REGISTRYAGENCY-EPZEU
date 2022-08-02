package bg.registryagency.epzeu.pr.application.provider;


import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.integration.api.application.ApplicationFormDto;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.InputStream;

/**
 *  Интерфейс служещ за осигуряване на заявления.
 *  Всяко заявление трябва да има собствен Provider, който имплементира текущия интерфейс, за да осигури съответното заявление.
 *

 */
public interface ApplicationFormProvider {
    /**
     * Създава заявление и го връща като JSON String.
     * @return JSON String на създаденото заявление.
     */
    String serializeApplicationAsJsonString(ApplicationFormDto application);

    /**
     * Сериализира заявление към JSON формат.
     * @return масив от битове на създаденото заявление.
     */
    byte[] serializeApplicationAsJsonByteArray(ApplicationFormDto application);

    /**
     * Сериализира XML заявление към JSON String.
     * @return JSON формат на XML заявление.
     */
    String serializeXmlApplicationAsJsonString(InputStream xmlAppInputStream);

    /**
     * Проверява дали начинът на автентикация на потребителя е позволена за дадено заявление.
     * Например:
     *  заявление X е позволено да се работи с него само ако потребителят е автентикиран чрез сертификат.
     *  заявление Y е позволено да се работи с него само ако потребителят е автентикиран чрез потребителско име и парола.
     *
     * @throws ApplicationDataException когато потребителя е автентикиран в системата с непозволен начин за съответно заявление
     */
    void validateAuthenticationType() throws ApplicationDataException;

    /**
     * Създава ново заявление, което зарежда с данни, които могат да се извлекат автоматично.
     * @return масив от битове на създаденото заявление.
     */
    ApplicationFormDto provideApplicationDto(JsonNode additionalData) throws ApplicationDataException;

    ApplicationFormDto buildNewInstanceOfApplicationDto();
}
