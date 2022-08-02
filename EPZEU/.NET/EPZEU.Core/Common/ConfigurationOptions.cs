using System;

namespace EPZEU.Common
{
    public class GlobalOptions
    {
        /// <summary>
        /// Базов адрес за достъп до услуги на ЕПЗЕУ.
        /// </summary>
        public string GL_EPZEU_API { get; set; }

        /// <summary>
        /// Базов адрес за публичен достъп до услуги на ЕПЗЕУ.
        /// </summary>
        public string GL_EPZEU_PUBLIC_API { get; set; }

        /// <summary>
        /// Базов адрес на сървър за автентикация.
        /// </summary>
        public string GL_IDSRV_URL { get; set; }

        /// <summary>
        /// Големина на буфер за копиране на данни. Използва при прехвърляне на данни, като това е размера на буфера в байтове.
        /// </summary>
        public int GL_COPY_BUFFER_SIZE { get; set; }

        /// <summary>
        /// Брой опити за извикване на услуга.
        /// </summary>
        public int GL_API_TRY_COUNT { get; set; }

        /// <summary>
        /// Период от време за изчакване между два опита за извикване на услуга.
        /// </summary>
        public TimeSpan GL_API_RETRY_INTERVAL { get; set; }

        /// <summary>
        /// Период от за опресняване на данни. Използва при опресняване на номеклатури, системни параметри.
        /// </summary>
        public TimeSpan GL_POLLING_INTERVAL { get; set; }

        /// <summary>
        /// Допустими типове файлове с документи, които могат да се прикачат.
        /// </summary>
        public string GL_DOCUMENT_ALLOWED_FORMATS { get; set; }

        /// <summary>
        /// Базов адрес за достъп до публичния портал на ЕПЗЕУ.
        /// </summary>
        public string GL_EPZEU_PUBLIC_UI_URL { get; set; }

        /// <summary>
        /// Базов адрес на публичния портал на Търговски регистър.
        /// </summary>
        public string GL_CR_PUBLIC_UI_URL { get; set; }

        /// <summary>
        /// Базов адрес на публичния портал на Имотния регистър.
        /// </summary>
        public string GL_PR_PUBLIC_UI_URL { get; set; }

        /// <summary>
        /// Базов адрес за достъп до услуги на Търговски регистър.
        /// </summary>
        public string GL_CR_API { get; set; }

        /// <summary>
        /// Базов адрес за достъп до портала за услуги на Търговски регистър.
        /// </summary>
        public string GL_CR_PORTAL_API { get; set; }

        /// <summary>
        /// Базов адрес за достъп до услуги на модул Плащания.
        /// </summary>
        public string GL_PAYMENTS_API { get; set; }

        /// <summary>
        /// Домейн адрес за сетване в cookie.
        /// </summary>
        public string GL_COMMON_COOKIE_DOMAIN { get; set; }

        /// <summary>
        /// Допустим размер на прикачен файл с документ в KB.
        /// </summary>
        public string GL_DOCUMENT_MAX_FILE_SIZE { get; set; }

        /// <summary>
        /// Максимален брой партиди/обекти, за които може да бъде заявен абонамент от регистър.
        /// </summary>
        public int EP_SUBSCRIPTION_MAX_OBJ_COUNT { get; set; }

        /// <summary>
        /// Разрешен интервал за неактивност от страна на потребителя.
        /// </summary>
        public TimeSpan EP_USR_SESSION_INACTIVITY_INTERVAL { get; set; }

        /// <summary>
        /// Интервал за авто запис на чернова на заявление.
        /// </summary>
        public TimeSpan GL_APPLICATION_DRAFTS_AUTO_SAVE_INTERVAL { get; set; }

        /// <summary>
        /// Брой елементи на страница при странициране.
        /// </summary>
        public int? GL_ITEMS_PER_PAGE { get; set; }

        /// <summary>
        /// Позволява тестово подписване на заявления и прикачени документи към заявления.
        /// </summary>
        public int? EP_SIGN_ALLOW_TEST_SIGN { get; set; }

        /// <summary>
        /// Максимален брой заявления записи, които да се обработят при една итерация по миграция на потребител 
        /// </summary>
        public int? EP_USR_MGR_PROCESSING_APP_MAX_COUNT { get; set; }
    }

}
