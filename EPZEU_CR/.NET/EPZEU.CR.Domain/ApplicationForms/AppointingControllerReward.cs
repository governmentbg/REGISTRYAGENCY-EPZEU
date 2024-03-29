﻿using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class AppointingControllerReward : AppointingDemandDocuments
    {
        [XmlIgnore]
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.AppointingControllerReward; }
        }
    }
}