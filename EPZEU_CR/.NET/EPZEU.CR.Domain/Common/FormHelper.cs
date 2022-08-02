using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.CR.Domain.Common
{
    public static class FormHelper
    {
        public static bool IsApplicationType(ApplicationFormTypes appType)
        {
            return
                IsApplicationAType(appType) ||
                IsApplicationBType(appType) ||
                IsApplicationVType(appType) ||
                IsApplicationGType(appType) ||
                IsApplicationDType(appType) ||
                IsApplicationEType(appType) ||
                IsApplicationJType(appType);
        }

        public static bool IsApplicationAType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.A1:
                case ApplicationFormTypes.A2:
                case ApplicationFormTypes.A3:
                case ApplicationFormTypes.A4:
                case ApplicationFormTypes.A5:
                case ApplicationFormTypes.A6:
                case ApplicationFormTypes.A7:
                case ApplicationFormTypes.A8:
                case ApplicationFormTypes.A9:
                case ApplicationFormTypes.A10:
                case ApplicationFormTypes.A11:
                case ApplicationFormTypes.A12:
                case ApplicationFormTypes.A13:
                case ApplicationFormTypes.A14:
                case ApplicationFormTypes.A15:
                case ApplicationFormTypes.A16:
                case ApplicationFormTypes.A17:
                case ApplicationFormTypes.A18:
                    return true;
            }

            return false;
        }

        public static bool IsApplicationBType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.B1:
                case ApplicationFormTypes.B2:
                case ApplicationFormTypes.B3:
                case ApplicationFormTypes.B4:
                case ApplicationFormTypes.B5:
                case ApplicationFormTypes.B6:
                case ApplicationFormTypes.B7:
                    return true;
            }

            return false;
        }

        public static bool IsApplicationVType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.V1:
                case ApplicationFormTypes.V2:
                case ApplicationFormTypes.V21:
                case ApplicationFormTypes.V22:
                case ApplicationFormTypes.V23:
                case ApplicationFormTypes.V24:
                case ApplicationFormTypes.V25:
                case ApplicationFormTypes.V26:
                case ApplicationFormTypes.V3:
                case ApplicationFormTypes.V31:
                case ApplicationFormTypes.V32:
                case ApplicationFormTypes.V33:
                    return true;
            }

            return false;
        }

        public static bool IsApplicationGType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.G1:
                case ApplicationFormTypes.G2:
                case ApplicationFormTypes.G3:               
                    return true;
            }

            return false;
        }

        public static bool IsApplicationDType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.D1:
                    return true;
            }

            return false;
        }

        public static bool IsApplicationEType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.E1:
                    return true;
            }

            return false;
        }

        public static bool IsApplicationJType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.J1:
                    return true;
            }

            return false;
        }

        
    }
}
