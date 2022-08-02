using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Utilities
{
    public class JsonData
    {
        [System.Text.Json.Serialization.JsonExtensionData]
        public Dictionary<string, object> JsonElements { get; set; }
    }
}
