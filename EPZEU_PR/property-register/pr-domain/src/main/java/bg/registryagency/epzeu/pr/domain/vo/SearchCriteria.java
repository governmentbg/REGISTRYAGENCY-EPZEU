package bg.registryagency.epzeu.pr.domain.vo;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Operation;
import lombok.Getter;

import java.util.UUID;

/**
 * Клас обвивка на критерии за търсене на обекти в Портал на Имотен регистър.
 */
public final class SearchCriteria {
    private SearchCriteria(){}

    /**
     * Критерии за търсене със странициране.
     */
    @Getter
    private static class SearchCriteriaPagination {
        /**Стартов индекс на страницата.*/
        private final Integer startIndex;
        /**Големина на страницата.*/
        private final Integer pageSize;
        /**Флаг указващ дали да се изчисли броят на резултатите отговарящи на критериите за търсене.*/
        private final boolean calculateCount;
        /**Брой максимално допустими записи от върнат резултат*/
        private final Integer maxNumberOfRecords;

        private SearchCriteriaPagination(SearchCriteriaBaseBuilder searchCriteriaBaseBuilder) {
            this.startIndex = searchCriteriaBaseBuilder.getStartIndex();
            this.pageSize = searchCriteriaBaseBuilder.getPageSize();
            this.calculateCount = searchCriteriaBaseBuilder.isCalculateCount();
            this.maxNumberOfRecords = searchCriteriaBaseBuilder.getMaxNumberOfRecords();
        }

        /**
         * Базов Builder за гъвкаво създаване на критерии за търсене.
         */
        @Getter
        protected static class SearchCriteriaBaseBuilder<T> {
            /**Реализация на специфичен Builder(създаване на специфични критерии за търсене), който разширява възможностите на базовия Builder*/
            private final Class<T> builderClass;
            /**Стартов индекс на страницата.*/
            private Integer startIndex;
            /**Големина на страницата.*/
            private Integer pageSize;
            /**Флаг указващ дали да се изчисли броят на резултатите отговарящи на критериите за търсене.*/
            private boolean calculateCount;
            /**Брой максимално допустими записи от върнат резултат*/
            private Integer maxNumberOfRecords;

            protected SearchCriteriaBaseBuilder(Class<T> builderClass) {
                this.builderClass = builderClass;
            }

            /**
             * Задаване на стартов индекс на страница като критерий за търсене.
             * @param startIndex стартов индекс на страница
             * @return Builder, който държи критериите за търсене.
             */
            public T startIndex(Integer startIndex) {
                this.startIndex = startIndex;
                return builderClass.cast(this);
            }

            /**
             * Задаване на големината на страница като критерий за търсене.
             * @param pageSize големина на страница.
             * @return Builder, който държи критериите за търсене.
             */
            public T pageSize(Integer pageSize) {
                this.pageSize = pageSize;
                return builderClass.cast(this);
            }

            /**
             * Задаване на флаг указващ дали да се изчислява броя на намерените резултати.
             * @param calculateCount флаг указващ дали да се изчислява броя на намерените резултати.
             * @return Builder, който държи критериите за търсене.
             */
            public T calculateCount(Boolean calculateCount) {
                this.calculateCount = calculateCount;
                return builderClass.cast(this);
            }

            /**
             * Задаване на максимално допустимия брой записи от върнат резултат.
             * @param maxNumberOfRecords брой указващ максимално допустимите записи за връщане като резултат.
             * @return Builder, който държи критериите за търсене.
             */
            public T maxNumberOfRecords(Integer maxNumberOfRecords) {
                this.maxNumberOfRecords = maxNumberOfRecords;
                return builderClass.cast(this);
            }
        }
    }

    /**
     * Критерии за търсене на процеси по заявяване.
     */
    @Getter
    public static class ApplicationProcessSearchCriteria extends SearchCriteriaPagination {
        /**Идентификатор на процес по заявяване.*/
        private final Long applicationProcessId;
        /**КИН на заявителя.*/
        private final Integer applicantCin;
        /**Идентификатор на заявката за подписване в модула за подписване*/
        private final UUID signingGuid;
        /**Тип на главното заявление на процес по заявяване.*/
        private final ApplicationType mainApplicationType;
        /**Флаг указващ дали да се заредят и заявленията към намерените процеси по заявяване.*/
        private final boolean loadApplications;
        /**Флаг указващ дали да се заредят и прикачениете документи към заявленията на намерените процеси по заявяване.*/
        private final boolean loadApplicationDocuments;
        /**Флаг указващ дали да се заредят и съдържанията на заявленията на намерените процеси по заявяване.*/
        private final boolean loadApplicationContents;

        private ApplicationProcessSearchCriteria(ApplicationProcessSearchCriteriaBuilder applicationProcessSearchCriteriaBuilder) {
            super(applicationProcessSearchCriteriaBuilder);

            this.applicationProcessId = applicationProcessSearchCriteriaBuilder.getApplicationProcessId();
            this.applicantCin = applicationProcessSearchCriteriaBuilder.getApplicantCin();
            this.signingGuid = applicationProcessSearchCriteriaBuilder.getSigningGuid();
            this.mainApplicationType = applicationProcessSearchCriteriaBuilder.getMainApplicationType();
            this.loadApplications = applicationProcessSearchCriteriaBuilder.isLoadApplications();
            this.loadApplicationDocuments = applicationProcessSearchCriteriaBuilder.isLoadApplicationDocuments();
            this.loadApplicationContents = applicationProcessSearchCriteriaBuilder.isLoadApplicationContents();
        }

        /**
         * Създава нова инстанция на Builder.
         * @return Builder за гъвкаво създаване на критерии за търсене на процес по заявяване.
         */
        public static ApplicationProcessSearchCriteriaBuilder builder() {
            return new ApplicationProcessSearchCriteriaBuilder();
        }

        /**
         * Builder за гъвкаво създаване на критерии за търсене на процес по заявяване.
         */
        @Getter
        public static class ApplicationProcessSearchCriteriaBuilder extends SearchCriteriaBaseBuilder<ApplicationProcessSearchCriteriaBuilder> {
            /**Идентификатор на процес по заявяване.*/
            private Long applicationProcessId;
            /**КИН на заявителя.*/
            private Integer applicantCin;
            /**Идентификатор на заявката за подписване в модула за подписване*/
            private UUID signingGuid;
            /**Тип на главното заявление на процес по заявяване.*/
            private ApplicationType mainApplicationType;
            /**Флаг указващ дали да се заредят заявленията към намерените процеси по заявяване.*/
            private boolean loadApplications;
            /**Флаг указващ дали да се заредят прикачениете документи към заявленията на намерените процеси по заявяване.*/
            private boolean loadApplicationDocuments;
            /**Флаг указващ дали да се заредят съдържанията на заявленията на намерените процеси по заявяване.*/
            private boolean loadApplicationContents;

            protected ApplicationProcessSearchCriteriaBuilder() {
                super(ApplicationProcessSearchCriteriaBuilder.class);
            }

            /**
             * Добавяне към Builder-а на идентификатор на процес по заявяване.
             * @param applicationProcessId идентификатор на процес по заявяване
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder applicationProcessId(Long applicationProcessId) {
                this.applicationProcessId = applicationProcessId;
                return this;
            }

            /**
             * Добавяне към Builder-а на идентификатор на заявителя.
             * @param applicantCin КИН на заявителя
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder applicantCin(Integer applicantCin) {
                this.applicantCin = applicantCin;
                return this;
            }

            /**
             * Добавяне към Builder-а на тип на главното заявление на процес по заявяване.
             * @param mainApplicationType тип на главното заявление.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder mainApplicationType(ApplicationType mainApplicationType) {
                this.mainApplicationType = mainApplicationType;
                return this;
            }

            /**
             * Добавяне към Builder-а на флаг указващ дали да се заредят заявленията към намерените процеси по заявяване.
             * @param loadApplications флаг указващ дали да се заредят заявленията към намерените процеси по заявяване.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder loadApplications(Boolean loadApplications) {
                this.loadApplications = loadApplications;
                return this;
            }

            /**
             * Добавяне към Builder-а на флаг указващ дали да се заредят прикачениете документи към заявленията на намерените процеси по заявяване.
             * @param loadApplicationDocuments флаг указващ дали да се заредят прикачениете документи към заявленията на намерените процеси по заявяване
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder loadApplicationDocuments(Boolean loadApplicationDocuments) {
                this.loadApplicationDocuments = loadApplicationDocuments;
                return this;
            }

            /**
             * Добавяне към Builder-а на флаг указващ дали да се заредят съдържанията на заявленията на намерените процеси по заявяване.
             * @param loadApplicationContents флаг указващ дали да се заредят съдържанията на заявленията на намерените процеси по заявяване
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessSearchCriteriaBuilder loadApplicationContents(Boolean loadApplicationContents) {
                this.loadApplicationContents = loadApplicationContents;
                return this;
            }

            /**
             * Добавяне към Builder-а на идентификатор на заявката към модула за подписване.
             * @param signingGuid
             * @return
             */
            public ApplicationProcessSearchCriteriaBuilder signingGuid(UUID signingGuid) {
                this.signingGuid = signingGuid;
                return this;
            }

            /**
             * Създаване на критериите за търсене на процес по заявяване.
             * @return критерии за търсене на процес по заявяване.
             */
            public ApplicationProcessSearchCriteria build() {
                return new ApplicationProcessSearchCriteria(this);
            }
        }
    }

    /**
     * Критерии за търсене на съдържание на заявление.
     */
    @Getter
    public static class ApplicationProcessContentSearchCriteria {
        /**Идентификатор на процес по заявяване.*/
        private final Long applicationProcessId;
        /**Списък с идентификатори на заявления.*/
        private final Long[] applicationIds;
        /**
         * Тип на съдържанието:
         * <li>{@link ApplicationProcessContent.Type#JSON}</li>
         * <li>{@link ApplicationProcessContent.Type#XML}</li>
         */
        private final ApplicationProcessContent.Type type;

        private ApplicationProcessContentSearchCriteria(ApplicationProcessContentSearchCriteriaBuilder applicationProcessContentSearchCriteriaBuilder) {
            this.applicationProcessId = applicationProcessContentSearchCriteriaBuilder.getApplicationProcessId();
            this.applicationIds = applicationProcessContentSearchCriteriaBuilder.getApplicationIds();
            this.type = applicationProcessContentSearchCriteriaBuilder.getType();
        }

        /**
         * Създава нова инстанция на Builder.
         * @return Builder за гъвкаво създаване на критерии за търсене на съдържания на заявления.
         */
        public static ApplicationProcessContentSearchCriteriaBuilder builder() {
            return new ApplicationProcessContentSearchCriteriaBuilder();
        }

        /**
         * Builder за гъвкаво създаване на критерии за търсене на съдържания на заявления.
         */
        @Getter
        public static class ApplicationProcessContentSearchCriteriaBuilder {
            /**Идентификатор на процес по заявяване.*/
            private Long applicationProcessId;
            /**Списък с идентификатори на заявления.*/
            private Long[] applicationIds;
            /**
             * Тип на съдържанието:
             * <li>{@link ApplicationProcessContent.Type#JSON}</li>
             * <li>{@link ApplicationProcessContent.Type#XML}</li>
             */
            private ApplicationProcessContent.Type type;

            protected ApplicationProcessContentSearchCriteriaBuilder() {}

            /**
             * Добавяна към Builder-а на идентификатор на процес по заявяване.
             * @param applicationProcessId идентификатор на процес по заявяване
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessContentSearchCriteriaBuilder applicationProcessId(Long applicationProcessId) {
                this.applicationProcessId = applicationProcessId;
                return this;
            }

            /**
             * Добавяна към Builder-а на идентификатори на заявления.
             * @param applicationIds списък с идентификатори на заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessContentSearchCriteriaBuilder applicationIds(Long... applicationIds) {
                this.applicationIds = applicationIds;
                return this;
            }

            /**
             * Добавяна към Builder-а на тип на съдържанито на заявлението.
             *  <li>{@link ApplicationProcessContent.Type#JSON}</li>
             *  <li>{@link ApplicationProcessContent.Type#XML}</li>
             * @param type съдържанито на заявлението.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationProcessContentSearchCriteriaBuilder type(ApplicationProcessContent.Type type) {
                this.type = type;
                return this;
            }

            /**
             * Създаване на критериите за търсене на съдържания на заявления.
             * @return критерии за търсене на съдържания на заявления.
             */
            public ApplicationProcessContentSearchCriteria build() {
                return new ApplicationProcessContentSearchCriteria(this);
            }
        }
    }

    /**
     * Критерии за търсене на заявления.
     */
    @Getter
    public static class ApplicationSearchCriteria {
        /**Идентификатор на процес по заявяване.*/
        private final Long applicationProcessId;
        /**Списък с идентификатори на заявления.*/
        private final Long[] applicationIds;
        /**Флаг указващ дали да се заредят прикачениете документи към заявленията на намерените процеси по заявяване.*/
        private final boolean loadApplicationDocuments;
        /**Флаг указващ дали да се заредят съдържанията на заявленията на намерените процеси по заявяване.*/
        private final boolean loadApplicationContents;

        private ApplicationSearchCriteria(ApplicationSearchCriteriaBuilder applicationSearchCriteriaBuilder) {
            this.applicationProcessId = applicationSearchCriteriaBuilder.getApplicationProcessId();
            this.applicationIds = applicationSearchCriteriaBuilder.getApplicationIds();
            this.loadApplicationDocuments = applicationSearchCriteriaBuilder.isLoadApplicationDocuments();
            this.loadApplicationContents = applicationSearchCriteriaBuilder.isLoadApplicationContent();
        }

        /**
         * Създава нова инстанция на Builder.
         * @return Builder за гъвкаво създаване на критерии за търсене на заявления.
         */
        public static ApplicationSearchCriteriaBuilder builder() {
            return new ApplicationSearchCriteriaBuilder();
        }

        /**
         * Builder за гъвкаво създаване на критерии за търсене на заявления.
         */
        @Getter
        public static class ApplicationSearchCriteriaBuilder {
            /**Идентификатор на процес по заявяване.*/
            private Long applicationProcessId;
            /**Списък с идентификатори на заявления.*/
            private Long[] applicationIds;
            /**Флаг указващ дали да се заредят прикачениете документи към заявленията на намерените процеси по заявяване.*/
            private boolean loadApplicationDocuments;
            /**Флаг указващ дали да се заредят съдържанията на заявленията на намерените процеси по заявяване.*/
            private boolean loadApplicationContent;

            protected ApplicationSearchCriteriaBuilder(){}

            /**
             * Добавяне към Builder-а на идентификатор на процес по заявяване.
             * @param applicationProcessId идентификатор на процес по заявяване
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationSearchCriteriaBuilder applicationProcessId(Long applicationProcessId) {
                this.applicationProcessId = applicationProcessId;
                return this;
            }

            /**
             * Добавяне към Builder-а на идентификатори на заявления.
             * @param applicationIds списък с идентификатори на заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationSearchCriteriaBuilder applicationIds(Long... applicationIds) {
                this.applicationIds = applicationIds;
                return this;
            }

            /**
             * Добавяне към Builder-а на флаг указващ дали да се заредят прикачениете документи към намерените заявления.
             * @param loadApplicationDocuments флаг указващ дали да се заредят прикачениете документи към намерените заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationSearchCriteriaBuilder loadApplicationDocuments(Boolean loadApplicationDocuments) {
                this.loadApplicationDocuments = loadApplicationDocuments;
                return this;
            }

            /**
             * Добавяне към Builder-а на флаг указващ дали да се заредят съдържанията на заявленията към намерените заявления.
             * @param loadApplicationContent флаг указващ дали да се заредят съдържанията на заявленията към намерените заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationSearchCriteriaBuilder loadApplicationContent(Boolean loadApplicationContent) {
                this.loadApplicationContent = loadApplicationContent;
                return this;
            }

            /**
             * Създаване на критериите за търсене на заявления.
             * @return критерии за търсене на заявления.
             */
            public ApplicationSearchCriteria build() {
                return new ApplicationSearchCriteria(this);
            }
        }
    }

    /**
     * Критерии за търсене на прикачени документи към заявление.
     */
    @Getter
    public static class ApplicationDocumentSearchCriteria {
        /**Идентификатори на заявления.*/
        private final Long[] applicationIds;
        /**Идентификатори на прикачени документи към заявления.*/
        private final Long[] applicationDocumentIds;

        private ApplicationDocumentSearchCriteria(ApplicationDocumentSearchCriteriaBuilder applicationDocumentSearchCriteriaBuilder) {
            this.applicationIds = applicationDocumentSearchCriteriaBuilder.getApplicationIds();
            this.applicationDocumentIds = applicationDocumentSearchCriteriaBuilder.getApplicationDocumentIds();
        }

        public static ApplicationDocumentSearchCriteriaBuilder builder() {
            return new ApplicationDocumentSearchCriteriaBuilder();
        }

        @Getter
        public static class ApplicationDocumentSearchCriteriaBuilder {
            /**Идентификатори на заявления.*/
            private Long[] applicationIds;
            /**Идентификатори на прикачени документи към заявления.*/
            private Long[] applicationDocumentIds;

            protected ApplicationDocumentSearchCriteriaBuilder() {}

            /**
             * Добавяне към Builder-а на списък с идентификатори на заявления.
             * @param applicationIds списък с идентификатори на заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationDocumentSearchCriteriaBuilder applicationIds(Long... applicationIds) {
                this.applicationIds = applicationIds;
                return this;
            }

            /**
             * Добавяне към Builder-а на списък с идентификатори на прикачени документи към заявления.
             * @param applicationDocumentIds списък с прикачени документи към заявления.
             * @return Builder, който държи критериите за търсене.
             */
            public ApplicationDocumentSearchCriteriaBuilder applicationDocumentIds(Long... applicationDocumentIds) {
                this.applicationDocumentIds = applicationDocumentIds;
                return this;
            }

            /**
             * Създаване на критериите за търсене на прикачени документи.
             * @return критерии за търсене на прикачени документи.
             */
            public ApplicationDocumentSearchCriteria build() {
                return new ApplicationDocumentSearchCriteria(this);
            }
        }
    }

    /**
     * Критерии за търсене на операции.
     */
    @Getter
    public static class OperationSearchCriteria {
        /**ИД на операция в базата.*/
        private Long serviceOperationId;
        /**Идентификатор на операция.*/
        private String operationId;
        /**Вид на операцията.*/
        private Operation.Type type;

        private OperationSearchCriteria(OperationSearchCriteria.OperationSearchCriteriaBuilder operationSearchCriteriaBuilder) {
            this.serviceOperationId = operationSearchCriteriaBuilder.getServiceOperationId();
            this.operationId = operationSearchCriteriaBuilder.getOperationId();
            this.type = operationSearchCriteriaBuilder.getType();
        }

        public static OperationSearchCriteria.OperationSearchCriteriaBuilder builder() {
            return new OperationSearchCriteria.OperationSearchCriteriaBuilder();
        }

        @Getter
        public static class OperationSearchCriteriaBuilder {
            /**ИД на операция в базата.*/
            private Long serviceOperationId;
            /**Идентификатор на операция.*/
            private String operationId;
            /**Вид на операцията.*/
            private Operation.Type type;

            protected OperationSearchCriteriaBuilder() {}

            /**
             * Добавяне към Builder-а на ИД на операция от базата данни.
             * @param serviceOperationId ИД на операция от базата данни.
             * @return Builder, който държи критериите за търсене.
             */
            public OperationSearchCriteria.OperationSearchCriteriaBuilder serviceOperationId(Long serviceOperationId) {
                this.serviceOperationId = serviceOperationId;
                return this;
            }

            /**
             * Добавяне към Builder-а на уникален идентификатор.
             * @param operationId уникален идентификатор на операции.
             * @return Builder, който държи критериите за търсене.
             */
            public OperationSearchCriteria.OperationSearchCriteriaBuilder operationId(String operationId) {
                this.operationId = operationId;
                return this;
            }

            /**
             * Добавяне към Builder-а на вид на операцията.
             * @param type вид на операцията.
             * @return Builder, който държи критериите за търсене.
             */
            public OperationSearchCriteria.OperationSearchCriteriaBuilder type(Operation.Type type) {
                this.type = type;
                return this;
            }

            /**
             * Създаване на критериите за търсене на операции.
             * @return критерии за търсене на операции.
             */
            public OperationSearchCriteria build() {
                return new OperationSearchCriteria(this);
            }
        }
    }
}
