using EPZEU.CR.Domain.Fields.Common;
using EPZEU.CR.Web.App.FieldViews.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU.Models;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public interface IFieldView
    {
        void HtmlDisplay(TextWriter writer, IField field, bool inHistoryMode = false);
    }

    public abstract class FieldViewBase<T> : IFieldView
    {
        protected bool _inHistoryMode;

        #region Properties

        public IStringLocalizer Localizer { get; set; }

        public IAuthorities Authorities { get; set; }

        public Integration.EPZEU.Nomenclatures.IBankruptcySenderTypes BankruptcySenderTypes { get; set; }

        public Integration.EPZEU.Nomenclatures.IBankruptcySuspendReasons BankruptcySuspendReasons { get; set; }

        public Integration.EPZEU.Nomenclatures.ITrusteeStatuses TrusteeStatuses { get; set; }

        public Integration.EPZEU.Nomenclatures.IForeignComRegisters ForeignComRegisters { get; set; }

        public Integration.EPZEU.Nomenclatures.IForeignLegalForms ForeignLegalForms { get; set; }

        public IObjectViewFactory ObjectViewFactory { get; set; }

        #endregion

        protected abstract void HtmlDisplayInternal(TextWriter writer, T field);

        public void HtmlDisplay(TextWriter writer, IField field, bool inHistoryMode = false)
        {
            _inHistoryMode = inHistoryMode;

            if (field != null)
            {
                if (field is RecordField)
                {
                    WrapRecordFieldForDisplay(writer, (RecordField)field, (wr, rf) =>
                    {
                        HtmlDisplayInternal(wr, (T)(object)rf);
                    });
                }
                else
                {
                    if (inHistoryMode
                        && field.FieldOperation != FieldOperations.Erase
                        && field.EntryApplicationType.HasValue
                        && field.EntryApplicationType.Value == ApplicationFormTypes.RequestForCorrection)
                    {
                        writer.Write("<b>");
                        writer.Write(LocalizeLabel("CR_APP_STRAIGHTENING_FACTUAL_ERROR_L"));
                        writer.Write("</b><br/>");
                    }

                    HtmlDisplayInternal(writer, (T)field);
                }
            }
        }

        public string LocalizeLabel(string labelKey)
        {
            var label = Localizer[labelKey];

            return label ?? "TODO_KEY_" + labelKey;
        }

        #region Protected Helpers

        protected string GetFieldOperationForErase(EraseOperations operations)
        {
            switch (operations)
            {
                case EraseOperations.Erase:
                    return LocalizeLabel("CR_GL_DELETED_CIRCUMSTANCE_E"); // "Заличено обстоятелство";                    
                case EraseOperations.EraseClause30:
                    return LocalizeLabel("CR_APP_00023_L"); // "Заличено обстоятелство по влязъл в сила акт на съда по чл. 30 от ЗТРРЮЛНЦ";
                case EraseOperations.EraseClause71:
                    return LocalizeLabel("CR_APP_00024_L");  //"Заличено обстоятелство по влязъл в сила акт на съда по чл. 71 от ТЗ";
                case EraseOperations.EraseClause74:
                    return LocalizeLabel("CR_APP_00025_L");  //"Заличено обстоятелство по влязъл в сила акт на съда по чл. 74 от ТЗ";
                default:
                    return "";
            }
        }

        protected void ObjectHtmlDisplay(TextWriter writer, object obj)
        {
            IObjectView objectView = ObjectViewFactory.CreateObjectView(obj);

            objectView.HtmlDisplay(writer, obj);
        }

        protected void ObjectHtmlDisplay<TParent>(TextWriter writer, object obj)
        {
            IObjectView objectView = ObjectViewFactory.CreateObjectView<TParent>();

            objectView.HtmlDisplay(writer, obj);
        }

        protected void WrapRecordFieldForDisplay<TField>(TextWriter writer, TField field, Action<TextWriter, TField> viewCreator) where TField : RecordField
        {
            if (_inHistoryMode
                    && field.EntryApplicationType.HasValue
                        && field.EntryApplicationType.Value == ApplicationFormTypes.RequestForCorrection)
            {
                writer.Write("<b>");
                writer.Write(LocalizeLabel("CR_APP_STRAIGHTENING_FACTUAL_ERROR_L"));
                writer.Write("</b><br/>");
            }

            if (field.FieldOperation == FieldOperations.Erase)
            {
                if (_inHistoryMode)
                {
                    writer.Write("<div class='record-container record-container--preview'><p class='field-text field-text--erased'>");
                    viewCreator(writer, field);
                    writer.Write("</p><div class='erasure-text-inline'><i class='ui-icon ui-icon-erased  mr-1'></i>");
                    writer.Write(GetFieldOperationForErase(field.EraseOperation.Value));
                    writer.Write("</div></div>");
                }
            }
            else
            {
                writer.Write("<div class='record-container record-container--preview'><p class='field-text'>");
                viewCreator(writer, field);
                writer.Write("</p></div>");
            }
        }

        protected void WrapRecordForDisplay<TRecord>(TextWriter writer, TRecord record, Action<TextWriter, TRecord> viewCreator) where TRecord : Record
        {
            if (record.RecordOperation == RecordOperations.Erase)
            {
                if (_inHistoryMode)
                {

                    writer.Write("<div class='record-container record-container--preview'><p class='field-text field-text--erased'>");
                    viewCreator(writer, record);
                    writer.Write("</p><div class='erasure-text-inline'><i class='ui-icon ui-icon-erased mr-1'></i>");
                    writer.Write(GetFieldOperationForErase(record.EraseOperation.Value));
                    writer.Write("</div></div>");
                }
            }
            else
            {
                writer.Write("<div class='record-container record-container--preview'><p class='field-text'>");
                viewCreator(writer, record);
                writer.Write("</p></div>");
            }
        }

        protected void WrapRecordListForDisplay<TRecord>(TextWriter writer, IEnumerable<TRecord> list, Action<TextWriter, TRecord> viewCreator) where TRecord : Record
        {
            if (list != null)
            {
                var recordsForDisplay = list.Where(r => (r.RecordOperation != RecordOperations.Erase && r.EraseOperation == null) || _inHistoryMode == true).ToList();

                if (recordsForDisplay != null)
                {
                    for (int i = 0; i < recordsForDisplay.Count; i++)
                    {
                        TRecord item = recordsForDisplay[i];

                        WrapRecordForDisplay(writer, item, viewCreator);

                        if (i != recordsForDisplay.Count - 1)
                        {
                            writer.Write("<hr class='hr--report' />");
                        }
                    }
                }
            }
        }

        protected void WrapRecordFieldListForDisplay<TField>(TextWriter writer, IEnumerable<TField> list, Action<TextWriter, TField> viewCreator) where TField : RecordField
        {
            if (list != null)
            {
                var recordfieldsForDisplay = list.Where(rf => rf.FieldOperation != FieldOperations.Erase || _inHistoryMode == true).ToList();

                if (recordfieldsForDisplay != null)
                {
                    for (int i = 0; i < recordfieldsForDisplay.Count; i++)
                    {
                        TField field = recordfieldsForDisplay[i];

                        WrapRecordFieldForDisplay(writer, field, viewCreator);

                        if (i != recordfieldsForDisplay.Count - 1)
                        {
                            writer.Write("<hr class='hr--report' />");
                        }
                    }
                }
            }
        }

        #endregion
    }
}
