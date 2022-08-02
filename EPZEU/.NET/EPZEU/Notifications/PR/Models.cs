using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Notifications.PR
{
    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.22.0 (Newtonsoft.Json v12.0.0.2)")]
    public partial class EmailNotificationsRequest
    {
        /// <summary>email на който да се изпращат нотификациите</summary>
        [Newtonsoft.Json.JsonProperty("personEmail", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string PersonEmail { get; set; }

        /// <summary>името на заявителя на абонамента</summary>
        [Newtonsoft.Json.JsonProperty("personFullName", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string PersonFullName { get; set; }

        /// <summary>колекция с ЕГН/ЕИК/ЛНЧ/Булстат за които се абонира заявителя</summary>
        [Newtonsoft.Json.JsonProperty("registeredUIDs", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.ICollection<string> RegisteredUIDs { get; set; }

        public string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }

        public static EmailNotificationsRequest FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<EmailNotificationsRequest>(data);
        }

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.22.0 (Newtonsoft.Json v12.0.0.2)")]
    public partial class EmailNotificationsResponse
    {
        /// <summary>Id на регистрирана нотификация</summary>
        [Newtonsoft.Json.JsonProperty("emailNotificationId", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string EmailNotificationId { get; set; }

        public string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }

        public static EmailNotificationsResponse FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<EmailNotificationsResponse>(data);
        }

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.22.0 (Newtonsoft.Json v12.0.0.2)")]
    public partial class EmailNotificationsError
    {
        /// <summary>Код на грешката</summary>
        [Newtonsoft.Json.JsonProperty("code", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int Code { get; set; }

        /// <summary>Описание на грешката</summary>
        [Newtonsoft.Json.JsonProperty("message", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Message { get; set; }

        public string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }

        public static EmailNotificationsError FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<EmailNotificationsError>(data);
        }

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.22.0 (Newtonsoft.Json v12.0.0.2)")]
    public partial class EmailNotification
    {
        /// <summary>Id на регистрирана нотификация</summary>
        [Newtonsoft.Json.JsonProperty("emailNotificationId", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string EmailNotificationId { get; set; }

        /// <summary>email на който да се изпращат нотификациите</summary>
        [Newtonsoft.Json.JsonProperty("personEmail", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string PersonEmail { get; set; }

        /// <summary>името на заявителя на абонамента</summary>
        [Newtonsoft.Json.JsonProperty("personFullName", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string PersonFullName { get; set; }

        /// <summary>колекция с ЕГН/ЕИК/ЛНЧ/Булстат за които се абонира заявителя</summary>
        [Newtonsoft.Json.JsonProperty("registeredUIDs", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.ICollection<string> RegisteredUIDs { get; set; }

        public string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }

        public static EmailNotification FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<EmailNotification>(data);
        }

    }
}
