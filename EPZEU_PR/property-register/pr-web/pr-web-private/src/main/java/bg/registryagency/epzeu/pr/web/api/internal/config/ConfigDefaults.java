package bg.registryagency.epzeu.pr.web.api.internal.config;

public class ConfigDefaults {
    interface Http {
        ApplicationApiProperties.Http.Version version = ApplicationApiProperties.Http.Version.V_1_1;

        interface Cache {
            int timeToLiveInDays = 1461; // 4 years (including leap day)
        }
    }
}
