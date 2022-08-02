namespace EPZEU.CR.Domain.Common
{
    public enum AppointingExpertType
    {
        Undefined = 0,
        /// <summary>
        /// Вещо лице
        /// </summary>
        CognizantPerson = 1,
        /// <summary>
        /// Контрольор
        /// </summary>
        Controller = 2,
        /// <summary>
        /// Проверител
        /// </summary>
        Surveyor = 3,
        /// <summary>
        /// ликвидатор
        /// </summary>
        Liquidator = 4,
        /// <summary>
        /// Регистриран одитор
        /// </summary>
        Expert = 5,
        /// <summary>
        /// Въведен на ръка експерт (ликвидатор)
        /// </summary>
        SingleUseExpert = 6
    }

    public enum EuropeanEconomicInterestRepresenterTypes
    {
        Undefined,
        Regular,
        Liquidator,
        Trustee
    }

    public enum AppointingApplicantType
    {
        Undefined = 0,
        /// <summary>
        /// Вещо лице
        /// </summary>
        CognizantPerson = 1,
        /// <summary>
        /// Контрольор
        /// </summary>
        Controller = 2,
        /// <summary>
        /// Проверител
        /// </summary>
        Surveyor = 3,
        /// <summary>
        /// ликвидатор
        /// </summary>
        Liquidator = 4,
        /// <summary>
        /// Експерт счетоводител
        /// </summary>
        Expert = 5,
        /// <summary>
        /// Заявител по искане
        /// </summary>
        Applicant = 6,
        /// <summary>
        /// Трето лице
        /// </summary>
        ThirdPerson = 7,
        /// <summary>
        /// Назначеното лице
        /// </summary>
        AssignedExpert = 20

    }

    public enum PackageType
    {
        New,
        ForChange,
        Preregistration,
        Transformation
    }
}
