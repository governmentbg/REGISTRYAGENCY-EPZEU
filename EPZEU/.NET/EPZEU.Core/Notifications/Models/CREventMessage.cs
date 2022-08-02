using System;
using System.Text.Json;

namespace EPZEU.Notifications.Models
{
    /// <summary>
    /// Видове събития в ТР
    /// 1 = Подадено е ново заявление; 2 = Промяна на статуса на заявление; 3 = Подадени са укажания по заявление; 4 = Ново вписване;
    /// </summary>
    public enum CREventTypes
    {
        /// <summary>
        /// Подадено е ново заявление.
        /// </summary>
        NewApplication = 1,

        /// <summary>
        /// Промяна на статуса на заявление.
        /// </summary>
        ApplicationStatusChange = 2,

        /// <summary>
        /// Подадени са укажания по заявление.
        /// </summary>
        NewApplicationInstruction = 3,

        /// <summary>
        /// Ново вписване.
        /// </summary>
        NewProcessing = 4
    }

    /// <summary>
    /// Съобщение за събитие в ТР
    /// </summary>
    public class CREventMessage
    {
        /// <summary>
        /// Данни
        /// </summary>
        private Object data;

        /// <summary>
        /// Идентификатор на събитие.
        /// </summary>
        public string EventID { get; set; }

        /// <summary>
        /// Вид събитие в ТР.
        /// </summary>
        public CREventTypes Type { get; set; }

        /// <summary>
        /// Дата на събитието.
        /// </summary>
        public DateTime EventDate { get; set; }

        /// <summary>
        /// Ключ на данните.
        /// </summary>
        public string DataKey { get; set; }

        /// <summary>
        /// Данни.
        /// </summary>
        public JsonElement Data { get; set; }

        public T GetData<T>()
        {
            if (data != null && (data is T))
            {
                return (T)data;
            }
            data = Data.Deserialize<T>();

            return (T)data;
        }
    }
}
