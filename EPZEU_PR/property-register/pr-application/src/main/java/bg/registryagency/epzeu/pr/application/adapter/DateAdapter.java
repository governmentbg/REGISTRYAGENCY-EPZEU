package bg.registryagency.epzeu.pr.application.adapter;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateAdapter extends XmlAdapter<String, Date> {
    static SimpleDateFormat xmlDateFormat = new SimpleDateFormat("YYYY-MM-dd");

    public Date unmarshal(String v) throws ParseException {
        return xmlDateFormat.parse(v);
    }

    public String marshal(Date v) {
        return xmlDateFormat.format(v);
    }
}
