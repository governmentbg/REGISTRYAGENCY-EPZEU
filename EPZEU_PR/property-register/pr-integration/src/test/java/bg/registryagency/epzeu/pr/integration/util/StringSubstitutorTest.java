package bg.registryagency.epzeu.pr.integration.util;

import bg.registryagency.epzeu.pr.integration.util.StringSubstitutor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class StringSubstitutorTest {

    @Test
    public void replace() {
        Map<String, String> substitutes = new HashMap<>();
        substitutes.put("placeholder", "Foo");
        substitutes.put("placeholder2", "Bar");
        String templateString = "Test string ${placeholder}{GL_TEST}, ${placeholder2}, ${placeholder2}.{}";
        String result = StringSubstitutor.replace(templateString, substitutes);

        assertThat(result).isEqualTo("Test string Foo{GL_TEST}, Bar, Bar.{}");
    }
}
