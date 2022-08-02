using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Microsoft.Extensions.Localization;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public interface IFieldViewHelper
    {
        void HtmlDisplay(TextWriter writer, Deed deed, SubDeedStatuses subDeedStatus, IField field);

        string DisplayCompanyName(LegalForms? legalForm, string companyName, CompanyNameSuffixFlags? flag = null);
    }

    public class FieldViewHelper : IFieldViewHelper
    {
        private IStringLocalizer localizer = null;

        private IFieldViewFactory fieldViewFactory = null;

        public FieldViewHelper(IStringLocalizer localizer, IFieldViewFactory fieldViewFactory)
        {
            this.localizer = localizer;
            this.fieldViewFactory = fieldViewFactory;
        }

        public void HtmlDisplay(TextWriter writer, Deed deed, SubDeedStatuses subDeedStatus, IField field)
        {
            var isDeedClosed = HasClosingFields(deed);
            var fieldView = fieldViewFactory.CreateFieldView(field);

            if (isDeedClosed)
            {
                if (DeedHelpers.IsDeedClosingField(field.FieldIdent))
                    fieldView.HtmlDisplay(writer, field);
            }
            else
            {
                if (field.FieldOperation == FieldOperations.Erase)
                {
                    if (subDeedStatus == SubDeedStatuses.Active)
                    {
                        if (!DeedHelpers.IsSubDeedClosingField(field.FieldIdent))
                        {
                            if (field is CompositeField compositeField)
                            {
                                Record r = compositeField.GetRecords().FirstOrDefault();
                                writer.Write("<div class='record-container record-container--preview'><div class='erasure-text-inline'><i class='ui-icon ui-icon-erased mr-1'></i>");
                                writer.Write(GetFieldOperationForErase(r.EraseOperation.Value));
                                writer.Write("</div></div>");
                            }
                            else
                            {
                                var r = field as RecordField;

                                writer.Write("<div class='record-container record-container--preview'><div class='erasure-text-inline'><i class='ui-icon ui-icon-erased mr-1'></i>");
                                writer.Write(GetFieldOperationForErase(r.EraseOperation.Value));
                                writer.Write("</div></div>");
                            }
                        }
                    }
                }
                else
                {
                    if (string.Compare(field.FieldIdent, F024_ShareTransfers.FieldIdentCode) != 0)
                    {
                        fieldView.HtmlDisplay(writer, field);

                        if (string.Compare(field.FieldIdent, F011_WayOfRepresentation.FieldIdentCode) == 0)
                        {
                            if (IsDeedInLiquidationOrInsolvency(deed))
                            {
                                GetTrusteesAndLiquidators(writer, deed);
                            }
                        }

                        if (isElementHolderForAddition(field.FieldIdent))
                        {
                            writer.Write(deed.ElementHolderAdditionFlag.HasValue && deed.ElementHolderAdditionFlag.Value != ElementHolderAdditionFlags.None ? " " + GetElementHolderAdditionalText(deed.ElementHolderAdditionFlag.Value) : "");
                        }
                    }
                }
            }
        }

        public string DisplayCompanyName(LegalForms? legalForm, string companyName, CompanyNameSuffixFlags? flag = null)
        {
            var suffix = flag.HasValue ? GetCompanyNameSuffixFlags(flag.Value) : "";

            if (legalForm.HasValue)
            {
                string lfnameCode = EPZEU.CR.Nomenclatures.LocalizationHelper.GetLegalFormNameCode(legalForm.Value);
                string lfTranslation = localizer[lfnameCode];

                if (legalForm == LegalForms.ET || legalForm == LegalForms.K)
                {
                    return string.Format("{0} \"{1}\"{2}", lfTranslation, companyName, suffix).TrimStart();
                }
                else
                {
                    return string.Format("\"{0}\" {1}{2}", companyName, lfTranslation, suffix).TrimEnd();
                }
            }
            else
            {
                return string.Format("{0}{1}", companyName, suffix);
            }
        }

        #region Helpers

        private string GetFieldOperationForErase(EraseOperations operations)
        {
            switch (operations)
            {
                case EraseOperations.Erase:
                    return localizer["CR_GL_DELETED_CIRCUMSTANCE_E"]; // "Заличено обстоятелство";                    
                case EraseOperations.EraseClause30:
                    return localizer["CR_APP_00023_L"]; // "Заличено обстоятелство по влязъл в сила акт на съда по чл. 30 от ЗТРРЮЛНЦ";
                case EraseOperations.EraseClause71:
                    return localizer["CR_APP_00024_L"];  //"Заличено обстоятелство по влязъл в сила акт на съда по чл. 71 от ТЗ";
                case EraseOperations.EraseClause74:
                    return localizer["CR_APP_00025_L"];  //"Заличено обстоятелство по влязъл в сила акт на съда по чл. 74 от ТЗ";
                default:
                    return "";
            }
        }

        private string GetCompanyNameSuffixFlags(CompanyNameSuffixFlags flag)
        {
            switch (flag)
            {
                case CompanyNameSuffixFlags.Liquidation:
                    return string.Format(" - {0}", localizer["CR_APP_IN_LIQUIDATION_L"]); //"в ликвидация";
                case CompanyNameSuffixFlags.Insolvency:
                case CompanyNameSuffixFlags.InsolvencySecIns:
                case CompanyNameSuffixFlags.InsolvencyThirdIns:
                    return string.Format(" - {0}", localizer["CR_APP_IN_INSOLVENCY_L"]); // "в несъстоятелност";
                case CompanyNameSuffixFlags.Stabilization:
                    return string.Format(" - {0}", localizer["CR_APP_STABILIZATION_PROCEDURE_L"]); // "в производство по стабилизация";
                default:
                    return "";
            }
        }

        private string GetElementHolderAdditionalText(ElementHolderAdditionFlags flag)
        {
            switch (flag)
            {
                case ElementHolderAdditionFlags.SuspendedRights:
                case ElementHolderAdditionFlags.SuspendedRightsSecIns:
                case ElementHolderAdditionFlags.SuspendedRightsThirdIns:
                    return string.Format(" - <b>{0}</b>", localizer["CR_APP_TERMINATION_POWERS_L"]);  // "ПРЕКРАТЕНИ ПРАВОМОЩИЯ";
                case ElementHolderAdditionFlags.DeprivedOfDispositionalPower:
                case ElementHolderAdditionFlags.DeprivedOfDispositionalPowerSecIns:
                case ElementHolderAdditionFlags.DeprivedOfDispositionalPowerThirdIns:
                    return string.Format(" - <b>{0}</b>", localizer["CR_APP_DEPRIVED_OF_AUTHORITY_L"]);  //"ЛИШЕНИ ОТ РАЗПОРЕДИТЕЛНА ВЛАСТ";
                default:
                    return "";
            }
        }

        private bool isElementHolderForAddition(string ident)
        {
            return ident == F007_Managers.FieldIdentCode
            || ident == F009_ChairMan.FieldIdentCode
            || ident == F010_Representatives.FieldIdentCode
            || ident == F0101_Representatives101.FieldIdentCode
            || ident == F0102_Representatives102.FieldIdentCode
            || ident == F012_BoardOfDirectors.FieldIdentCode
            || ident == F013_BoardOfManagers.FieldIdentCode
            || ident == F013_BoardOfManagers2.FieldIdentCode
            || ident == F014_SupervisingBoard.FieldIdentCode
            || ident == F015_ControllingBoard.FieldIdentCode;
        }

        private void GetTrusteesAndLiquidators(TextWriter writer, Deed deed)
        {
            var liquidators = deed.SubDeeds.Where(sd => sd.SubUICType == SubUICTypes.B6_Liquidation && sd.Status.HasValue && sd.Status == SubDeedStatuses.Active);
            var trustees = deed.SubDeeds.SingleOrDefault(sd => sd.SubUICType == SubUICTypes.Bankruptcy && sd.Status.HasValue && sd.Status == SubDeedStatuses.Active);

            if (deed.ElementHolderAdditionFlag.HasValue
                && deed.ElementHolderAdditionFlag.Value != ElementHolderAdditionFlags.None
                && trustees != null
                && trustees.Fields != null
                && trustees.Fields.Any())
            {
                var trusteesThirdIns = trustees.Fields.Where(f => string.Compare(((IField)f).FieldIdent, F912_3_TrusteesThirdIns.FieldIdentCode, true) == 0).ToList();
                var trusteesSecIns = trustees.Fields.Where(f => string.Compare(((IField)f).FieldIdent, F912_2_TrusteesSecIns.FieldIdentCode, true) == 0).ToList();
                var trusteesFirstIns = trustees.Fields.Where(f => string.Compare(((IField)f).FieldIdent, F912_Trustees.FieldIdentCode, true) == 0).ToList();

                trusteesThirdIns.ForEach(trustee =>
                {
                    writer.Write(localizer["CR_F_912_L"]);
                    writer.Write(": <br/>");

                    //Трета инстанция.
                    var trusteesThirdInsField = (F912_3_TrusteesThirdIns)trustee;

                    if (trusteesThirdInsField.TrusteeThirdInsList != null)
                    {
                        trusteesThirdInsField.TrusteeThirdInsList.Where(el => el.RecordOperation == RecordOperations.Current).ToList().ForEach(el =>
                        {
                            writer.Write(el.Person.Name);
                            writer.Write("<br/>");
                        });
                    }
                });

                trusteesSecIns.ForEach(trustee =>
                {
                    writer.Write(localizer["CR_F_912_L"]);
                    writer.Write(": <br/>");

                    //Втора инстанция.
                    var trusteesSecInsField = (F912_2_TrusteesSecIns)trustee;
                    if (trusteesSecInsField.TrusteeSecInsList != null)
                    {
                        trusteesSecInsField.TrusteeSecInsList.Where(el => el.RecordOperation == RecordOperations.Current).ToList().ForEach(el =>
                        {
                            writer.Write(el.Person.Name);
                            writer.Write("<br/>");
                        });
                    }
                });

                trusteesFirstIns.ForEach(trustee =>
                {
                    writer.Write(localizer["CR_F_912_L"]);
                    writer.Write(": <br/>");

                    //Първа инстанция.
                    var trusteesField = (F912_Trustees)trustee;
                    if (trusteesField.TrusteeList != null)
                    {
                        trusteesField.TrusteeList.Where(el => el.RecordOperation == RecordOperations.Current).ToList().ForEach(el =>
                        {
                            writer.Write(el.Person.Name);
                            writer.Write("<br/>");
                        });
                    }
                });
            }
            else
            {
                if (liquidators.Any())
                {
                    var liquidatorFields = liquidators.SelectMany(l => l.Fields)
                        .Where(f => string.Compare(((IField)f).FieldIdent, F502_Liquidators.FieldIdentCode, true) == 0 && (((IField)f).FieldOperation == FieldOperations.Current || ((IField)f).FieldOperation == FieldOperations.Add)).ToList();

                    liquidatorFields.ForEach(lf =>
                    {
                        writer.Write(localizer["CR_F_502_L"]);
                        writer.Write(": <br/>");

                        var liquidatorField = (F502_Liquidators)lf;
                        liquidatorField.LiquidatorList.Where(l=>l.RecordOperation == RecordOperations.Current).ToList().ForEach(l =>
                        {
                            writer.Write(l.Subject.Name);
                            writer.Write("<br/>");
                        });
                    });
                }
            }
        }

        private bool HasClosingFields(Deed domDeed)
        {
            var mainSubdeed = domDeed.SubDeeds.SingleOrDefault(sd => sd.SubUICType.HasValue && sd.SubUICType.Value == SubUICTypes.MainCircumstances);

            return mainSubdeed != null
                    && mainSubdeed.Fields != null
                    && mainSubdeed.Fields.Where(f => DeedHelpers.IsDeedClosingField(((IField)f).FieldIdent)).Any(f =>
                    {
                        var ifield = (IField)f;

                        bool notErased = !ifield.FieldOperation.HasValue || ifield.FieldOperation != FieldOperations.Erase;

                        return notErased;
                    });
        }


        private bool IsDeedInLiquidationOrInsolvency(Deed domDeed)
        {
            return domDeed.CompanyNameSuffixFlag.HasValue &&
                (domDeed.CompanyNameSuffixFlag == CompanyNameSuffixFlags.Liquidation
                || domDeed.CompanyNameSuffixFlag == CompanyNameSuffixFlags.Insolvency
                || domDeed.CompanyNameSuffixFlag == CompanyNameSuffixFlags.InsolvencySecIns
                || domDeed.CompanyNameSuffixFlag == CompanyNameSuffixFlags.InsolvencyThirdIns);
        }

        #endregion
    }
}
