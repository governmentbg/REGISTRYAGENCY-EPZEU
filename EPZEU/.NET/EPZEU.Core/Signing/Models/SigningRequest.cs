﻿using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace EPZEU.Signing.Models
{
    /// <summary>
    /// Клас капсулиращ данни за заявка за създаване на процеса по подисване.
    /// </summary>
    public class SigningRequest
    {
        /// <summary>
        /// Съдържание за подписване.
        /// </summary>
        [JsonIgnore]
        [System.Text.Json.Serialization.JsonIgnore]
        public Stream Content { get; set; }

        /// <summary>
        /// Формат на подписа (CADES, PADES или XADES). 
        public SigningFormats? Format { get; set; }

        /// <summary>
        /// Име на файла за подписване.
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        ///MIME тип на файла за подписване.
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Адрес за известяване при прекратен процес по подписване.
        /// </summary>
        public string RejectedCallbackUrl { get; set; }

        /// <summary>
        /// Адрес за известяване при успешно завършен процес по подписване.
        /// </summary>
        public string CompletedCallbackUrl { get; set; }

        /// <summary>
        /// Списък с заявки за подписващи към процеса.
        /// </summary>
        public List<SignerRequest> SignerRequests { get; set; }
    }
}
