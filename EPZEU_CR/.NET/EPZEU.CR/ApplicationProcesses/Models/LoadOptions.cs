namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Опции за търсене на данни за процеси на заявяване на услуга.
    /// </summary>
    public class ApplicationProcessLoadOption
    {       
        /// <summary>
        /// Флаг за зареждане на заявление.
        /// </summary>
        public bool? LoadApplications { get; set; }

        /// <summary>
        /// Флаг за зареждане на документи на заявление.
        /// </summary>
        public bool? LoadApplicationDocuments { get; set; }

        /// <summary>
        /// Флаг за съдържание на пакети за вписване.
        /// </summary>
        public bool? LoadApplicationContent { get; set; }

        /// <summary>
        /// Флаг за зареждаен на под процесите по заявяване на услуга. 
        /// </summary>
        public bool? LoadChildApplicationProcesses { get; set; }

        public bool? LoadWithLock { get; set; }
    }

    /// <summary>
    /// Опции за търсене на заявление.
    /// </summary>
    public class ApplicationLoadOption
    {
        /// <summary>
        /// Флаг за зареждане на документи на заявление.
        /// </summary>
        public bool? LoadApplicationDocuments { get; set; }

        /// <summary>
        /// Флаг за съдържание на пакети за вписване.
        /// </summary>
        public bool? LoadApplicationContent { get; set; }
    }

    /// <summary>
    /// Критерии за търсене на данни за процеси на заявяване на услуга.
    /// </summary>
    public class ApplicationProcessContentLoadOption
    {
        /// <summary>
        /// Флаг за зареждане на пакети за вписване.
        /// </summary>
        public bool LoadContent { get; set; }
    }
}
