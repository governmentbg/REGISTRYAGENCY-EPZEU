using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;
using System.Linq;

namespace EPZEU.CR.Domain.Fields
{
    public abstract partial class Statement : Record
    {
        #region Xml Properties

        [XmlAttribute("ActModeText")]
        public string ActModeText { get; set; }

        [XmlAttribute("ActModeValue")]
        public string ActModeValue { get; set; }

        [XmlAttribute("Description")]
        public string Description { get; set; }

        [XmlAttribute("ActDate")]
        public string ActDate { get; set; }

        [XmlAttribute("ActYear")]
        public string ActYear { get; set; }

        [XmlAttribute("ActID")]
        public string ActID { get; set; }

        [XmlAttribute("ActWithErasedPersonalData")]
        [JsonIgnore]
        public string ActWithErasedPersonalData
        {
            get { return IsActWithErasedPersonalData.HasValue && IsActWithErasedPersonalData.Value ? "1" : "0"; }
            set { IsActWithErasedPersonalData = (value == "1"); }
        }

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool? IsActWithErasedPersonalData { get; set; }

        #endregion

        //TODO: Ако не ни трябват да се изтрият пропъртитата отдолу

        //[XmlIgnore]
        ////Izpolza pri razpraskvane na aktove po partidi i
        ////pri zarejdane na aktove, po koito mogat da se vdignat partidi,
        ////koito triavda da izliazat v udostoverenie za zakonomernost(E1).
        ////Vtorata logika e prodaljenie na parvata.
        //public bool IsMultiCompanyAct
        //{
        //    get { return this.ActModeValue.Equals(((int)StatementEnum.StatementAC).ToString()); }//договор/план за преобразуване
        //}

        [XmlIgnore]
        public bool explicit_not_delete = false;

        static public bool LegalFormShouldHaveACA(LegalForms lf)
        {
            return lf != LegalForms.ET && lf != LegalForms.KCHT && lf != LegalForms.TPP;
        }
    }

    public interface IStatements
    {
        List<Statement> StatementsList { get; }
    }

    public abstract partial class StatementsBase<T> : CompositeField, IStatements where T: Statement
    {
        [XmlIgnore]
        public abstract List<T> Statements { get; set; }

        [XmlIgnore]
        [JsonIgnore]
        public List<Statement> StatementsList
        {
            get
            {
                return Statements != null ? Statements.Cast<Statement>().ToList() : null;
            }
        }
    }

    #region StatementA

    [XmlType(TypeName = "StatementA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019A0_StatementA : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019A0";
    }

    [XmlType(TypeName = "StatementsA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019A_StatementsA : StatementsBase<F10019A0_StatementA>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019A";

        [XmlElement(ElementName = "StatementA")]
        public override List<F10019A0_StatementA> Statements { get; set; }
    }

    #endregion

    #region StatementB

    [XmlType(TypeName = "StatementB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019B0_StatementB : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019B0";
    }

    [XmlType(TypeName = "StatementsB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019B_StatementsB : StatementsBase<F10019B0_StatementB>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019B";

        [XmlElement(ElementName = "StatementB")]
        public override List<F10019B0_StatementB> Statements { get; set; }
    }

    #endregion

    #region StatementC

    [XmlType(TypeName = "StatementC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019C0_StatementC : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019C0";
    }

    [XmlType(TypeName = "StatementsC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019C_StatementsC : StatementsBase<F10019C0_StatementC>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019C";

        [XmlElement(ElementName = "StatementC")]
        public override List<F10019C0_StatementC> Statements { get; set; }
    }

    #endregion

    #region StatementD

    [XmlType(TypeName = "StatementD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019D0_StatementD : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019D0";
    }

    [XmlType(TypeName = "StatementsD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019D_StatementsD : StatementsBase<F10019D0_StatementD>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019D";

        [XmlElement(ElementName = "StatementD")]
        public override List<F10019D0_StatementD> Statements { get; set; }
    }

    #endregion

    #region StatementE

    [XmlType(TypeName = "StatementE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019E0_StatementE : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019E0";
    }

    [XmlType(TypeName = "StatementsE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019E_StatementsE : StatementsBase<F10019E0_StatementE>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019E";

        [XmlElement(ElementName = "StatementE")]
        public override List<F10019E0_StatementE> Statements { get; set; }
    }

    #endregion

    #region StatementF

    [XmlType(TypeName = "StatementF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019F0_StatementF : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019F0";
    }

    [XmlType(TypeName = "StatementsF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019F_StatementsF : StatementsBase<F10019F0_StatementF>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019F";

        [XmlElement(ElementName = "StatementF")]
        public override List<F10019F0_StatementF> Statements { get; set; }
    }

    #endregion

    #region StatementG

    [XmlType(TypeName = "StatementG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019G0_StatementG : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019G0";
    }

    [XmlType(TypeName = "StatementsG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019G_StatementsG : StatementsBase<F10019G0_StatementG>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019G";

        [XmlElement(ElementName = "StatementG")]
        public override List<F10019G0_StatementG> Statements { get; set; }
    }

    #endregion

    #region StatementH

    [XmlType(TypeName = "StatementH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019H0_StatementH : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019H0";
    }

    [XmlType(TypeName = "StatementsH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019H_StatementsH : StatementsBase<F10019H0_StatementH>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019H";

        [XmlElement(ElementName = "StatementH")]
        public override List<F10019H0_StatementH> Statements { get; set; }
    }

    #endregion

    #region StatementI

    [XmlType(TypeName = "StatementI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019I0_StatementI : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019I0";
    }

    [XmlType(TypeName = "StatementsI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019I_StatementsI : StatementsBase<F10019I0_StatementI>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019I";

        [XmlElement(ElementName = "StatementI")]
        public override List<F10019I0_StatementI> Statements { get; set; }
    }

    #endregion

    #region StatementJ

    [XmlType(TypeName = "StatementJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019J0_StatementJ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019J0";
    }

    [XmlType(TypeName = "StatementsJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019J_StatementsJ : StatementsBase<F10019J0_StatementJ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019J";

        [XmlElement(ElementName = "StatementJ")]
        public override List<F10019J0_StatementJ> Statements { get; set; }
    }

    #endregion

    #region StatementK

    [XmlType(TypeName = "StatementK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019K0_StatementK : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019K0";
    }

    [XmlType(TypeName = "StatementsK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019K_StatementsK : StatementsBase<F10019K0_StatementK>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019K";

        [XmlElement(ElementName = "StatementK")]
        public override List<F10019K0_StatementK> Statements { get; set; }
    }

    #endregion

    #region StatementL

    [XmlType(TypeName = "StatementL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019L0_StatementL : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019L0";
    }

    [XmlType(TypeName = "StatementsL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019L_StatementsL : StatementsBase<F10019L0_StatementL>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019L";

        [XmlElement(ElementName = "StatementL")]
        public override List<F10019L0_StatementL> Statements { get; set; }
    }

    #endregion

    #region StatementM

    [XmlType(TypeName = "StatementM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019M0_StatementM : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019M0";
    }

    [XmlType(TypeName = "StatementsM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019M_StatementsM : StatementsBase<F10019M0_StatementM>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019M";

        [XmlElement(ElementName = "StatementM")]
        public override List<F10019M0_StatementM> Statements { get; set; }
    }

    #endregion

    #region StatementN

    [XmlType(TypeName = "StatementN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019N0_StatementN : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019N0";
    }

    [XmlType(TypeName = "StatementsN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019N_StatementsN : StatementsBase<F10019N0_StatementN>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019N";

        [XmlElement(ElementName = "StatementN")]
        public override List<F10019N0_StatementN> Statements { get; set; }
    }

    #endregion

    #region StatementO

    [XmlType(TypeName = "StatementO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019O0_StatementO : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019O0";
    }

    [XmlType(TypeName = "StatementsO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019O_StatementsO : StatementsBase<F10019O0_StatementO>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019O";

        [XmlElement(ElementName = "StatementO")]
        public override List<F10019O0_StatementO> Statements { get; set; }
    }

    #endregion

    #region StatementP

    [XmlType(TypeName = "StatementP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019P0_StatementP : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019P0";
    }

    [XmlType(TypeName = "StatementsP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019P_StatementsP : StatementsBase<F10019P0_StatementP>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019P";

        [XmlElement(ElementName = "StatementP")]
        public override List<F10019P0_StatementP> Statements { get; set; }
    }

    #endregion

    #region StatementQ

    [XmlType(TypeName = "StatementQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Q0_StatementQ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Q0";
    }

    [XmlType(TypeName = "StatementsQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Q_StatementsQ : StatementsBase<F10019Q0_StatementQ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Q";

        [XmlElement(ElementName = "StatementQ")]
        public override List<F10019Q0_StatementQ> Statements { get; set; }
    }

    #endregion

    #region StatementR

    [XmlType(TypeName = "StatementR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019R0_StatementR : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019R0";
    }

    [XmlType(TypeName = "StatementsR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019R_StatementsR : StatementsBase<F10019R0_StatementR>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019R";

        [XmlElement(ElementName = "StatementR")]
        public override List<F10019R0_StatementR> Statements { get; set; }
    }

    #endregion

    #region StatementS

    [XmlType(TypeName = "StatementS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019S0_StatementS : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019S0";
    }

    [XmlType(TypeName = "StatementsS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019S_StatementsS : StatementsBase<F10019S0_StatementS>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019S";

        [XmlElement(ElementName = "StatementS")]
        public override List<F10019S0_StatementS> Statements { get; set; }
    }

    #endregion

    #region StatementT

    [XmlType(TypeName = "StatementT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019T0_StatementT : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019T0";
    }

    [XmlType(TypeName = "StatementsT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019T_StatementsT : StatementsBase<F10019T0_StatementT>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019T";

        [XmlElement(ElementName = "StatementT")]
        public override List<F10019T0_StatementT> Statements { get; set; }
    }

    #endregion

    #region StatementU

    [XmlType(TypeName = "StatementU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019U0_StatementU : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019U0";
    }

    [XmlType(TypeName = "StatementsU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019U_StatementsU : StatementsBase<F10019U0_StatementU>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019U";

        [XmlElement(ElementName = "StatementU")]
        public override List<F10019U0_StatementU> Statements { get; set; }
    }

    #endregion

    #region StatementV

    [XmlType(TypeName = "StatementV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019V0_StatementV : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019V0";
    }

    [XmlType(TypeName = "StatementsV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019V_StatementsV : StatementsBase<F10019V0_StatementV>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019V";

        [XmlElement(ElementName = "StatementV")]
        public override List<F10019V0_StatementV> Statements { get; set; }
    }

    #endregion

    #region StatementW

    [XmlType(TypeName = "StatementW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019W0_StatementW : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019W0";
    }

    [XmlType(TypeName = "StatementsW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019W_StatementsW : StatementsBase<F10019W0_StatementW>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019W";

        [XmlElement(ElementName = "StatementW")]
        public override List<F10019W0_StatementW> Statements { get; set; }
    }

    #endregion

    #region StatementX

    [XmlType(TypeName = "StatementX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019X0_StatementX : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019X0";
    }

    [XmlType(TypeName = "StatementsX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019X_StatementsX : StatementsBase<F10019X0_StatementX>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019X";

        [XmlElement(ElementName = "StatementX")]
        public override List<F10019X0_StatementX> Statements { get; set; }
    }

    #endregion

    #region StatementY

    [XmlType(TypeName = "StatementY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Y0_StatementY : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Y0";
    }

    [XmlType(TypeName = "StatementsY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Y_StatementsY : StatementsBase<F10019Y0_StatementY>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Y";

        [XmlElement(ElementName = "StatementY")]
        public override List<F10019Y0_StatementY> Statements { get; set; }
    }

    #endregion

    #region StatementZ

    [XmlType(TypeName = "StatementZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Z0_StatementZ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Z0";
    }

    [XmlType(TypeName = "StatementsZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F10019Z_StatementsZ : StatementsBase<F10019Z0_StatementZ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "10019Z";

        [XmlElement(ElementName = "StatementZ")]
        public override List<F10019Z0_StatementZ> Statements { get; set; }
    }

    #endregion

    #region StatementAA

    [XmlType(TypeName = "StatementAA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AA0_StatementAA : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AA0";
    }

    [XmlType(TypeName = "StatementsAA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AA_StatementsAA : StatementsBase<F1001AA0_StatementAA>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AA";

        [XmlElement(ElementName = "StatementAA")]
        public override List<F1001AA0_StatementAA> Statements { get; set; }
    }

    #endregion

    #region StatementAB

    [XmlType(TypeName = "StatementAB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AB0_StatementAB : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AB0";
    }

    [XmlType(TypeName = "StatementsAB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AB_StatementsAB : StatementsBase<F1001AB0_StatementAB>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AB";

        [XmlElement(ElementName = "StatementAB")]
        public override List<F1001AB0_StatementAB> Statements { get; set; }
    }

    #endregion

    #region StatementAC

    [XmlType(TypeName = "StatementAC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AC0_StatementAC : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AC0";
    }

    [XmlType(TypeName = "StatementsAC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AC_StatementsAC : StatementsBase<F1001AC0_StatementAC>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AC";

        [XmlElement(ElementName = "StatementAC")]
        public override List<F1001AC0_StatementAC> Statements { get; set; }
    }

    #endregion

    #region StatementAD

    [XmlType(TypeName = "StatementAD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AD0_StatementAD : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AD0";
    }

    [XmlType(TypeName = "StatementsAD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AD_StatementsAD : StatementsBase<F1001AD0_StatementAD>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AD";

        [XmlElement(ElementName = "StatementAD")]
        public override List<F1001AD0_StatementAD> Statements { get; set; }
    }

    #endregion

    #region StatementAE

    [XmlType(TypeName = "StatementAE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AE0_StatementAE : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AE0";
    }

    [XmlType(TypeName = "StatementsAE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AE_StatementsAE : StatementsBase<F1001AE0_StatementAE>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AE";

        [XmlElement(ElementName = "StatementAE")]
        public override List<F1001AE0_StatementAE> Statements { get; set; }
    }

    #endregion

    #region StatementAF

    [XmlType(TypeName = "StatementAF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AF0_StatementAF : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AF0";
    }

    [XmlType(TypeName = "StatementsAF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AF_StatementsAF : StatementsBase<F1001AF0_StatementAF>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AF";

        [XmlElement(ElementName = "StatementAF")]
        public override List<F1001AF0_StatementAF> Statements { get; set; }
    }

    #endregion

    #region StatementAG

    [XmlType(TypeName = "StatementAG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AG0_StatementAG : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AG0";
    }

    [XmlType(TypeName = "StatementsAG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AG_StatementsAG : StatementsBase<F1001AG0_StatementAG>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AG";

        [XmlElement(ElementName = "StatementAG")]
        public override List<F1001AG0_StatementAG> Statements { get; set; }
    }

    #endregion

    #region StatementAH

    [XmlType(TypeName = "StatementAH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AH0_StatementAH : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AH0";
    }

    [XmlType(TypeName = "StatementsAH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AH_StatementsAH : StatementsBase<F1001AH0_StatementAH>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AH";

        [XmlElement(ElementName = "StatementAH")]
        public override List<F1001AH0_StatementAH> Statements { get; set; }
    }

    #endregion

    #region StatementAI

    [XmlType(TypeName = "StatementAI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AI0_StatementAI : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AI0";
    }

    [XmlType(TypeName = "StatementsAI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AI_StatementsAI : StatementsBase<F1001AI0_StatementAI>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AI";

        [XmlElement(ElementName = "StatementAI")]
        public override List<F1001AI0_StatementAI> Statements { get; set; }
    }

    #endregion

    #region StatementAJ

    [XmlType(TypeName = "StatementAJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AJ0_StatementAJ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AJ0";
    }

    [XmlType(TypeName = "StatementsAJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAJ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AJ_StatementsAJ : StatementsBase<F1001AJ0_StatementAJ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AJ";

        [XmlElement(ElementName = "StatementAJ")]
        public override List<F1001AJ0_StatementAJ> Statements { get; set; }
    }

    #endregion

    #region StatementAK

    [XmlType(TypeName = "StatementAK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AK0_StatementAK : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AK0";
    }

    [XmlType(TypeName = "StatementsAK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAK", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AK_StatementsAK : StatementsBase<F1001AK0_StatementAK>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AK";

        [XmlElement(ElementName = "StatementAK")]
        public override List<F1001AK0_StatementAK> Statements { get; set; }
    }

    #endregion

    #region StatementAL

    [XmlType(TypeName = "StatementAL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AL0_StatementAL : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AL0";
    }

    [XmlType(TypeName = "StatementsAL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAL", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AL_StatementsAL : StatementsBase<F1001AL0_StatementAL>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AL";

        [XmlElement(ElementName = "StatementAL")]
        public override List<F1001AL0_StatementAL> Statements { get; set; }
    }

    #endregion

    #region StatementAM

    [XmlType(TypeName = "StatementAM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AM0_StatementAM : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AM0";
    }

    [XmlType(TypeName = "StatementsAM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAM", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AM_StatementsAM : StatementsBase<F1001AM0_StatementAM>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AM";

        [XmlElement(ElementName = "StatementAM")]
        public override List<F1001AM0_StatementAM> Statements { get; set; }
    }

    #endregion

    #region StatementAN

    [XmlType(TypeName = "StatementAN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AN0_StatementAN : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AN0";
    }

    [XmlType(TypeName = "StatementsAN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAN", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AN_StatementsAN : StatementsBase<F1001AN0_StatementAN>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AN";

        [XmlElement(ElementName = "StatementAN")]
        public override List<F1001AN0_StatementAN> Statements { get; set; }
    }

    #endregion

    #region StatementAO

    [XmlType(TypeName = "StatementAO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AO0_StatementAO : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AO0";
    }

    [XmlType(TypeName = "StatementsAO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAO", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AO_StatementsAO : StatementsBase<F1001AO0_StatementAO>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AO";

        [XmlElement(ElementName = "StatementAO")]
        public override List<F1001AO0_StatementAO> Statements { get; set; }
    }

    #endregion

    #region StatementAP

    [XmlType(TypeName = "StatementAP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AP0_StatementAP : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AP0";
    }

    [XmlType(TypeName = "StatementsAP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAP", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AP_StatementsAP : StatementsBase<F1001AP0_StatementAP>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AP";

        [XmlElement(ElementName = "StatementAP")]
        public override List<F1001AP0_StatementAP> Statements { get; set; }
    }

    #endregion

    #region StatementAQ

    [XmlType(TypeName = "StatementAQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AQ0_StatementAQ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AQ0";
    }

    [XmlType(TypeName = "StatementsAQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAQ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AQ_StatementsAQ : StatementsBase<F1001AQ0_StatementAQ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AQ";

        [XmlElement(ElementName = "StatementAQ")]
        public override List<F1001AQ0_StatementAQ> Statements { get; set; }
    }

    #endregion

    #region StatementAR

    [XmlType(TypeName = "StatementAR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AR0_StatementAR : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AR0";
    }

    [XmlType(TypeName = "StatementsAR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAR", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AR_StatementsAR : StatementsBase<F1001AR0_StatementAR>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AR";

        [XmlElement(ElementName = "StatementAR")]
        public override List<F1001AR0_StatementAR> Statements { get; set; }
    }

    #endregion

    #region StatementAS

    [XmlType(TypeName = "StatementAS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AS0_StatementAS : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AS0";
    }

    [XmlType(TypeName = "StatementsAS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAS", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AS_StatementsAS : StatementsBase<F1001AS0_StatementAS>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AS";

        [XmlElement(ElementName = "StatementAS")]
        public override List<F1001AS0_StatementAS> Statements { get; set; }
    }

    #endregion

    #region StatementAT

    [XmlType(TypeName = "StatementAT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AT0_StatementAT : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AT0";
    }

    [XmlType(TypeName = "StatementsAT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAT", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AT_StatementsAT : StatementsBase<F1001AT0_StatementAT>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AT";

        [XmlElement(ElementName = "StatementAT")]
        public override List<F1001AT0_StatementAT> Statements { get; set; }
    }

    #endregion

    #region StatementAU

    [XmlType(TypeName = "StatementAU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AU0_StatementAU : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AU0";
    }

    [XmlType(TypeName = "StatementsAU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAU", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AU_StatementsAU : StatementsBase<F1001AU0_StatementAU>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AU";

        [XmlElement(ElementName = "StatementAU")]
        public override List<F1001AU0_StatementAU> Statements { get; set; }
    }

    #endregion

    #region StatementAV

    [XmlType(TypeName = "StatementAV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AV0_StatementAV : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AV0";
    }

    [XmlType(TypeName = "StatementsAV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAV", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AV_StatementsAV : StatementsBase<F1001AV0_StatementAV>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AV";

        [XmlElement(ElementName = "StatementAV")]
        public override List<F1001AV0_StatementAV> Statements { get; set; }
    }

    #endregion

    #region StatementAW

    [XmlType(TypeName = "StatementAW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AW0_StatementAW : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AW0";
    }

    [XmlType(TypeName = "StatementsAW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAW", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AW_StatementsAW : StatementsBase<F1001AW0_StatementAW>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AW";

        [XmlElement(ElementName = "StatementAW")]
        public override List<F1001AW0_StatementAW> Statements { get; set; }
    }

    #endregion

    #region StatementAX

    [XmlType(TypeName = "StatementAX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AX0_StatementAX : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AX0";
    }

    [XmlType(TypeName = "StatementsAX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAX", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AX_StatementsAX : StatementsBase<F1001AX0_StatementAX>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AX";

        [XmlElement(ElementName = "StatementAX")]
        public override List<F1001AX0_StatementAX> Statements { get; set; }
    }

    #endregion

    #region StatementAY

    [XmlType(TypeName = "StatementAY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AY0_StatementAY : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AY0";
    }

    [XmlType(TypeName = "StatementsAY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAY", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AY_StatementsAY : StatementsBase<F1001AY0_StatementAY>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AY";

        [XmlElement(ElementName = "StatementAY")]
        public override List<F1001AY0_StatementAY> Statements { get; set; }
    }

    #endregion

    #region StatementAZ

    [XmlType(TypeName = "StatementAZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementAZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AZ0_StatementAZ : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AZ0";
    }

    [XmlType(TypeName = "StatementsAZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsAZ", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001AZ_StatementsAZ : StatementsBase<F1001AZ0_StatementAZ>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001AZ";

        [XmlElement(ElementName = "StatementAZ")]
        public override List<F1001AZ0_StatementAZ> Statements { get; set; }
    }

    #endregion

    #region StatementBA

    [XmlType(TypeName = "StatementBA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BA0_StatementBA : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BA0";
    }

    [XmlType(TypeName = "StatementsBA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBA", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BA_StatementsBA : StatementsBase<F1001BA0_StatementBA>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BA";

        [XmlElement(ElementName = "StatementBA")]
        public override List<F1001BA0_StatementBA> Statements { get; set; }
    }

    #endregion

    #region StatementBB

    [XmlType(TypeName = "StatementBB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BB0_StatementBB : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BB0";
    }

    [XmlType(TypeName = "StatementsBB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBB", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BB_StatementsBB : StatementsBase<F1001BB0_StatementBB>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BB";

        [XmlElement(ElementName = "StatementBB")]
        public override List<F1001BB0_StatementBB> Statements { get; set; }
    }

    #endregion

    #region StatementBC

    [XmlType(TypeName = "StatementBC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BC0_StatementBC : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BC0";
    }

    [XmlType(TypeName = "StatementsBC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BC_StatementsBC : StatementsBase<F1001BC0_StatementBC>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BC";

        [XmlElement(ElementName = "StatementBC")]
        public override List<F1001BC0_StatementBC> Statements { get; set; }
    }

    #endregion

    #region StatementBD

    [XmlType(TypeName = "StatementBD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BD0_StatementBD : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BD0";
    }

    [XmlType(TypeName = "StatementsBD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBD", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BD_StatementsBD : StatementsBase<F1001BD0_StatementBD>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BD";

        [XmlElement(ElementName = "StatementBD")]
        public override List<F1001BD0_StatementBD> Statements { get; set; }
    }

    #endregion

    #region StatementBE

    [XmlType(TypeName = "StatementBE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BE0_StatementBE : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BE0";
    }

    [XmlType(TypeName = "StatementsBE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BE_StatementsBE : StatementsBase<F1001BE0_StatementBE>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BE";

        [XmlElement(ElementName = "StatementBE")]
        public override List<F1001BE0_StatementBE> Statements { get; set; }
    }

    #endregion

    #region StatementBF

    [XmlType(TypeName = "StatementBF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BF0_StatementBF : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BF0";
    }

    [XmlType(TypeName = "StatementsBF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBF", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BF_StatementsBF : StatementsBase<F1001BF0_StatementBF>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BF";

        [XmlElement(ElementName = "StatementBF")]
        public override List<F1001BF0_StatementBF> Statements { get; set; }
    }

    #endregion

    #region StatementBG

    [XmlType(TypeName = "StatementBG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BG0_StatementBG : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BG0";
    }

    [XmlType(TypeName = "StatementsBG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBG", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BG_StatementsBG : StatementsBase<F1001BG0_StatementBG>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BG";

        [XmlElement(ElementName = "StatementBG")]
        public override List<F1001BG0_StatementBG> Statements { get; set; }
    }

    #endregion

    #region StatementBH

    [XmlType(TypeName = "StatementBH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BH0_StatementBH : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BH0";
    }

    [XmlType(TypeName = "StatementsBH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBH", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BH_StatementsBH : StatementsBase<F1001BH0_StatementBH>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BH";

        [XmlElement(ElementName = "StatementBH")]
        public override List<F1001BH0_StatementBH> Statements { get; set; }
    }

    #endregion

    #region StatementBI

    [XmlType(TypeName = "StatementBI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementBI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BI0_StatementBI : Statement
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BI0";
    }

    [XmlType(TypeName = "StatementsBI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StatementsBI", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1001BI_StatementsBI : StatementsBase<F1001BI0_StatementBI>
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "1001BI";

        [XmlElement(ElementName = "StatementBI")]
        public override List<F1001BI0_StatementBI> Statements { get; set; }
    }

    #endregion
}