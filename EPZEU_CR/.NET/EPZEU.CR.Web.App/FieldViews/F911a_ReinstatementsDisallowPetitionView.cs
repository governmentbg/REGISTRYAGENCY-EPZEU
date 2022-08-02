﻿using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F911a_ReinstatementsDisallowPetitionView : FieldViewBase<F911a_ReinstatementsDisallowPetition>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F911a_ReinstatementsDisallowPetition field)
        {
            WrapRecordListForDisplay(writer, field.ReinstatementDisallowPetitionList, (w, r) =>
            {
                if (string.IsNullOrEmpty(r.SenderType.Name))
                {
                    if (r.SenderType.ID.HasValue)
                    {
                        var senderType = BankruptcySenderTypes.GetAll().SingleOrDefault(st => st.ID == r.SenderType.ID);
                        r.SenderType.Name = senderType?.Name;
                    }
                }

                w.Write(r.Title);
                w.Write("<br/>");
                w.Write(r.Petitioner.Name);
                w.Write(string.IsNullOrEmpty(r.SenderType.Name) ? "" : ", " + r.SenderType.Name);
                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.ActData);
            });
        }
    }
}