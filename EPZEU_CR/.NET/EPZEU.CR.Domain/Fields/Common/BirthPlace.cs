using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Място на раждане.
    /// </summary>
    public partial class BirthPlace
    {
        #region Properties

        /// <summary>
        /// Държава.
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// Място.
        /// </summary>
        public string Place { get; set; }
       
        #endregion
    }
}