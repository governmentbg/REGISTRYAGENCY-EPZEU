using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F704_Branches704View : FieldViewBase<F704_Branches704>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F704_Branches704 field)
        {
            WrapRecordListForDisplay(writer, field.BranchList, (w, r) =>
            {
                if (!r.BranchSubject.IsEmpty())
                {
                    if (r.BranchSubject.IndentType != Domain.Fields.Common.IndentTypes.EGN)
                    {
                        w.Write(LocalizeLabel("GL_COMPANY_L"));
                        w.Write(": ");
                        ObjectHtmlDisplay(w, r.BranchSubject);
                    }

                    if (r.Branches != null && r.Branches.Count > 0)
                    {
                        w.Write("<br/>");

                        if (!string.IsNullOrEmpty(r.Branches[0].BranchCode)
                            && !string.IsNullOrEmpty(r.Branches[0].FirmName))
                        {
                            w.Write(LocalizeLabel("CR_GL_BRANCHES_L"));
                            w.Write(":<br/>");
                        }

                        r.Branches.ForEach(b => {
                            if (!string.IsNullOrEmpty(b.BranchCode)
                            && !string.IsNullOrEmpty(b.FirmName))
                            {
                                w.Write(LocalizeLabel("GL_COMPANY_NAME_BRANCH_L"));
                                w.Write(": ");
                                w.Write(b.FirmName);
                                w.Write("<br/>");
                                w.Write(LocalizeLabel("GL_BRANCH_ID_L"));
                                w.Write(": ");
                                w.Write(b.BranchCode);
                                w.Write("<br/>");
                            }
                        });
                    }
                }
            });
        }
    }
}
