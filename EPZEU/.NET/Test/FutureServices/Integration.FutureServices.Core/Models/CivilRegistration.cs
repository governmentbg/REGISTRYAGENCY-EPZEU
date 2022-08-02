using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Integration.FutureServices.Core.Models
{
    public enum IdentTypes
    {
        /// <summary>
        /// ЕГН
        /// </summary>
        EGN = 1,

        /// <summary>
        /// ЛНЧ
        /// </summary>
        LNCh = 2
    }

    public enum CivilRegistrationTypes
    { 
        /// <summary>
        /// Роден
        /// </summary>
        Born=1,

        /// <summary>
        /// Женен
        /// </summary>
        Мarried = 2,

        /// <summary>
        /// Разведен
        /// </summary>
        Divorced = 3,

        /// <summary>
        /// Умрял
        /// </summary>
        Died = 4
    }

    public class CivilRegistrationRequest
    {
        public IdentTypes? IdentType { get; set; }

        public string Ident { get; set; }
    }

    public class CivilRegistrationResponse
    {
        public IdentTypes? IdentType { get; set; }

        public string Ident { get; set; }

        public bool? PersonHasCivilRegistration { get; set; }

        public CivilRegistrationTypes? CivilRegistration { get; set; }
    }
}
