package bg.registryagency.epzeu.pr.application.adapter;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.time.LocalDate;

public class LocalDateAdapter extends XmlAdapter<String, LocalDate> {
    public LocalDate unmarshal(String v) {
        //This removing of time zone is only because there is already created applications with java.util.Date with timezone,
        // to read such a applications successfully remove timezone

        int timeZoneIndex = v.indexOf('+');
        if(timeZoneIndex != -1) {
            v = v.substring(0, timeZoneIndex);
        }

        return LocalDate.parse(v);
    }

    public String marshal(LocalDate v) {
        return v.toString();
    }
}
