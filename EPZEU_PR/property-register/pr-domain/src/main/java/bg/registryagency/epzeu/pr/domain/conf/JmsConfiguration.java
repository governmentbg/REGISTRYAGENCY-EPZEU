package bg.registryagency.epzeu.pr.domain.conf;

import bg.registryagency.epzeu.pr.domain.exception.MessageProcessingException;
import bg.registryagency.epzeu.pr.domain.listener.ApplicationProcessListener;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jms.AQjmsObjectMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jms.annotation.JmsListenerConfigurer;
import org.springframework.jms.config.JmsListenerEndpointRegistrar;
import org.springframework.jms.config.SimpleJmsListenerEndpoint;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.ConnectionFactory;
import javax.jms.JMSException;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class JmsConfiguration implements JmsListenerConfigurer {

    private final ApplicationProcessListener applicationProcessListener;
    private final Environment environment;
    private final ApplicationDomainProperties domainProperties;

    @Value(value = "${" + AppParameterKey.PR_PORTAL_QUEUE_NAME + "}")
    private String queueName;

    @Bean
    public JmsTemplate jmsTemplate(ConnectionFactory connectionFactory) {
        refreshQueueNameIfDevProfile();

        JmsTemplate jmsTemplate = new JmsTemplate();
        jmsTemplate.setSessionTransacted(true);
        jmsTemplate.setDefaultDestinationName(queueName);
        jmsTemplate.setConnectionFactory(connectionFactory);

        return jmsTemplate;
    }

    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
        if(domainProperties.getQueue().isListener()) {
            refreshQueueNameIfDevProfile();

            SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
            endpoint.setId("sendApplications");
            endpoint.setDestination(queueName);
            endpoint.setMessageListener(message -> {
                try {
                    applicationProcessListener.sendApplications((AQjmsObjectMessage) message);
                } catch (JMSException e) {
                    log.error(e.getMessage(), e);
                    throw new MessageProcessingException(e.getMessage());
                }
            });
            registrar.registerEndpoint(endpoint);

            if(log.isInfoEnabled()) {
                log.info("JMS Listener is registered: " + endpoint.getId() + ", for Queue:" + queueName);
            }
        }
    }

    private void refreshQueueNameIfDevProfile() {
        String[] activeProfiles = environment.getActiveProfiles();
        String activeProfile = activeProfiles[0];

        if (activeProfile.equals(ApplicationConstants.SPRING_PROFILE_DEVELOPMENT)) {
            queueName = domainProperties.getQueue().getName();
        }
    }
}
