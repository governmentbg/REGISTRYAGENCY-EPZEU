package bg.registryagency.epzeu.pr.application.adapter;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalTimeAdapter extends XmlAdapter<String, LocalTime> {
    public LocalTime unmarshal(String v) {
        return LocalTime.parse(v);
    }

    public String marshal(LocalTime v) {
        return v.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
}
