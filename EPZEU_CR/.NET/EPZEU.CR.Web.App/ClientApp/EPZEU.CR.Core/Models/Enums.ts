import { TypeSystem } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

export enum LegalForms {

    ET = 1,

    SD = 2,

    KD = 3,

    OOD = 4,

    EOOD = 10,

    AD = 5,

    EAD = 11,

    IAD = 12,

    IEAD = 15,

    KDA = 6,

    K = 7,

    KCHT = 8,

    TPPD = 13,

    TPPO = 14,

    TPP = 9,

    EUIE = 16,

    DEUIE = 17,

    ED = 18,

    EKD = 19,

    LEKD = 20,

    CHD = 21,

    CHDU = 22,

    CHDF = 23,

    ASSOC = 24,

    FOUND = 25,

    BFLE = 26,

    CC = 27,
}
TypeSystem.registerEnumInfo(LegalForms, 'LegalForms', moduleContext.moduleName)

export enum DeedStatuses {

    New = 1,

    Existing = 2,

    NewClosed = 3,

    ExistingClosed = 4,
}
TypeSystem.registerEnumInfo(DeedStatuses, 'DeedStatuses', moduleContext.moduleName)

export enum SubDeedStatuses {

    Closed = 1,

    Active = 2
}
TypeSystem.registerEnumInfo(SubDeedStatuses, 'SubDeedStatuses', moduleContext.moduleName)

export enum ApplicationFormTypes {
    /**Неопределен*/
    Undefined = 0,

    /**A1*/
    A1 = 101,

    /**A2*/
    A2 = 102,

    /**A3*/
    A3 = 103,

    /**A4*/
    A4 = 104,

    /**A5*/
    A5 = 105,

    /**A6*/
    A6 = 106,

    /**A7*/
    A7 = 107,

    /**A8*/
    A8 = 108,

    /**A9*/
    A9 = 121,

    /**AA*/
    AA = 128,

    /**B1*/
    B1 = 109,

    /**B2*/
    B2 = 110,

    /**B3*/
    B3 = 111,

    /**B4*/
    B4 = 112,

    /**B5*/
    B5 = 113,

    /**B6*/
    B6 = 114,

    /**B7*/
    B7 = 155,

    /**V1*/
    V1 = 116,

    /**V2*/
    V2 = 117,

    /**V3*/
    V3 = 118,

    /**G1*/
    G1 = 119,

    /**D1*/
    D1 = 120,

    /**V21*/
    V21 = 122,

    /**V22*/
    V22 = 123,

    /**V23*/
    V23 = 124,

    /**V31*/
    V31 = 125,

    /**V31*/
    V32 = 126,

    /**E1*/
    E1 = 132,

    /**A10*/
    A10 = 133,

    /**A11*/
    A11 = 134,

    /**A12*/
    A12 = 135,

    /**A13*/
    A13 = 136,

    /**A14*/
    A14 = 154,

    /**A15*/
    A15 = 156,

    /**A16*/
    A16 = 157,

    /**A17*/
    A17 = 158,

    /**A18*/
    A18 = 159,

    /**V24*/
    V24 = 137,

    /**V25*/
    V25 = 161,

    /**V26*/
    V26 = 162,

    /**V33*/
    V33 = 138,

    /**J1*/
    J1 = 139,

    /**G2*/
    G2 = 140,

    /**G3*/
    G3 = 160,

    /**Complaint*/
    Complaint = 1000,

    /**ActOfContestation*/
    ActOfContestation = 1201,

    /**RequestForCorrection*/
    RequestForCorrection = 401,

    /**AppointingExpert*/
    AppointingExpert = 601,

    /**Декларация-съгласие.*/
    AppointingDeclaration = 606,

    /**Доклад и експертиза.*/
    AppointingReportAndExamination = 607,

    /**Искане за корекция на назначенията.*/
    AppointingRequestForCorrection = 608,

    /**Искане за определяне на възнаграждение на контрольор.*/
    AppointingControllerReward = 611,

    /**Искане за освобождаване на депозит.*/
    AppointingReleaseDeposit = 610,

    /**отвод.*/
    ReleaseAppointingExpert = 602,

    /**Искане за промяна на лицето.*/
    AppointingChangeRequest = 603,

    /**Приемане на депозит.*/
    AppointingPaidDeposit = 605,

    /**Становище по искането за промяна на лицето.*/
    AttitudeOfChangeRequest = 612,

    /**Уведомление за липса на средства.*/
    NotificationOfLackOfMeans = 615,

    /**Уведомление за смяна на адреса за изпращане и кореспонденция.*/
    AppointingContactAddressChange = 613,

    /**Уведомление, че вещото лице не може да изготви експертизата в срок.*/
    NotificationOfExaminationImpossibility = 609,

    /**Акт за оповестяване*/
    CourtAct = 301,

    /**Служебна пререгистрация на клон*/
    CourtBranchReg = 302,

    /**Уведомление от регистри на други държави*/
    AnnouncementFromOtherRegister = 303,

    /**Уведомление от системата за взаимно свързване на регистрите относно клон*/
    BRISBranchDisclosureReceptionMessage = 304,

    /**Уведомление от системата за взаимно свързване на регистрите относно преобразуване*/
    BRISCrossborderMergeReceptionMessage = 305,

    BRISChangeCompanyEUIDReceptionMessage = 306,

    /**Самосезиране*/
    InternalRequestForCorrection = 402,

    /**Сезиране при назначение*/
    AssignmentInternalReguestForCorrection = 403,

    /**Допълнителна задача след вписване по партида*/
    DeedPostWork = 501,

    /**Искане за издаване на карта*/
    DemandIssueCard = 701,

    /**Искане за съгласие на ликвидатор*/
    LiquidatorsAgreement = 801,

    /**Удостоверение за запазена фирма/наименование*/
    CertificateForReserveFirm = 901,

    /**Разпореждане на съда за доокомплектоване*/
    OrderForCompletion = 1101,

    /**Акт на съда по несъстоятелност*/
    BankruptcyAct = 1301,

    /**Удостоверение за актуално състояние*/
    ActualStateCertificate = 1401,

    /**Удостоверение за вписвания за определен период*/
    EntryByPeriodCertificate = 1501,

    /**Удостоверение за обявявания за определен период*/
    PublicationByPeriodCertificate = 1601,

    /**Удостоверение за вписано обстоятелство*/
    EnteredCircumstancesCertificate = 1701,

    /**Удостоверение за обявяване или копие от обявен акт*/
    ActOrCopyOfActCertificate = 1801,

    /**Удостоверение за липса на вписано обстоятелство или обявен акт*/
    MissingActsCertificate = 1901,

    /**Копие от документ, въз основа на който е извършено вписване или заличаване*/
    DocumentOfStatesCertificate = 2001,

    /**Невъзможност на лицето*/
    AppointingImpossibility = 604,

    /**Назначаване на ликвидатор системно*/
    AppointingLiquidatorSystem = 614,

    /**Допълнителни полета*/
    AppExtraFields = 201,

    /**Служебна пререгистрация по УАС*/
    OfficialUASRegistration = 2101,

    /**Уведомления за грешка при сканиране*/
    InitialCommunication = 10000
}
TypeSystem.registerEnumInfo(ApplicationFormTypes, 'ApplicationFormTypes', moduleContext.moduleName)


//TODO_да се пита дали да остане така (всички типове, които не са от тип Application)
export enum NonApplicationTypes {
    /**Complaint*/
    Complaint = 1000,

    /**ActOfContestation*/
    ActOfContestation = 1201,

    /**RequestForCorrection*/
    RequestForCorrection = 401,

    /**AppointingExpert*/
    AppointingExpert = 601,

    /**Декларация-съгласие.*/
    AppointingDeclaration = 606,

    /**Доклад и експертиза.*/
    AppointingReportAndExamination = 607,

    /**Искане за корекция на назначенията.*/
    AppointingRequestForCorrection = 608,

    /**Искане за определяне на възнаграждение на контрольор.*/
    AppointingControllerReward = 611,

    /**Искане за освобождаване на депозит.*/
    AppointingReleaseDeposit = 610,

    /**отвод.*/
    ReleaseAppointingExpert = 602,

    /**Искане за промяна на лицето.*/
    AppointingChangeRequest = 603,

    /**Приемане на депозит.*/
    AppointingPaidDeposit = 605,

    /**Становище по искането за промяна на лицето.*/
    AttitudeOfChangeRequest = 612,

    /**Уведомление за липса на средства.*/
    NotificationOfLackOfMeans = 615,

    /**Уведомление за смяна на адреса за изпращане и кореспонденция.*/
    AppointingContactAddressChange = 613,

    /**Уведомление, че вещото лице не може да изготви експертизата в срок.*/
    NotificationOfExaminationImpossibility = 609,

    /**Акт за оповестяване*/
    CourtAct = 301,

    /**Служебна пререгистрация на клон*/
    CourtBranchReg = 302,

    /**Уведомление от регистри на други държави*/
    AnnouncementFromOtherRegister = 303,

    /**Уведомление от системата за взаимно свързване на регистрите относно клон*/
    BRISBranchDisclosureReceptionMessage = 304,

    /**Уведомление от системата за взаимно свързване на регистрите относно преобразуване*/
    BRISCrossborderMergeReceptionMessage = 305,

    /**Самосезиране*/
    InternalRequestForCorrection = 402,

    /**Сезиране при назначение*/
    AssignmentInternalReguestForCorrection = 403,

    /**Допълнителна задача след вписване по партида*/
    DeedPostWork = 501,

    /**Искане за издаване на карта*/
    DemandIssueCard = 701,

    /**Искане за съгласие на ликвидатор*/
    LiquidatorsAgreement = 801,

    /**Удостоверение за запазена фирма/наименование*/
    CertificateForReserveFirm = 901,

    /**Разпореждане на съда за доокомплектоване*/
    OrderForCompletion = 1101,

    /**Акт на съда по несъстоятелност*/
    BankruptcyAct = 1301,

    /**Удостоверение за актуално състояние*/
    ActualStateCertificate = 1401,

    /**Удостоверение за вписвания за определен период*/
    EntryByPeriodCertificate = 1501,

    /**Удостоверение за обявявания за определен период*/
    PublicationByPeriodCertificate = 1601,

    /**Удостоверение за вписано обстоятелство*/
    EnteredCircumstancesCertificate = 1701,

    /**Удостоверение за обявяване или копие от обявен акт*/
    ActOrCopyOfActCertificate = 1801,

    /**Удостоверение за липса на вписано обстоятелство или обявен акт*/
    MissingActsCertificate = 1901,

    /**Копие от документ, въз основа на който е извършено вписване или заличаване*/
    DocumentOfStatesCertificate = 2001,

    /**Невъзможност на лицето*/
    AppointingImpossibility = 604,

    /**Назначаване на ликвидатор системно*/
    AppointingLiquidatorSystem = 614,

    /**Допълнителни полета*/
    AppExtraFields = 201,

    /**Служебна пререгистрация по УАС*/
    OfficialUASRegistration = 2101,
}
TypeSystem.registerEnumInfo(NonApplicationTypes, 'NonApplicationTypes', moduleContext.moduleName)


//TODO_да се пита дали да остане така - всички заявления на BG
export enum ApplicationFormTypesBG {

    /**А1*/
    "А1" = 101,

    /**А2*/
    "А2" = 102,

    /**А3*/
    "А3" = 103,

    /**А4*/
    "А4" = 104,

    /**А5*/
    "А5" = 105,

    /**А6*/
    "А6" = 106,

    /**А7*/
    "А7" = 107,

    /**А8*/
    "А8" = 108,

    /**А9*/
    "А9" = 121,

    /**АА*/
    "АА" = 128,

    /**Б1*/
    "Б1" = 109,

    /**Б2*/
    "Б2" = 110,

    /**Б3*/
    "Б3" = 111,

    /**Б4*/
    "Б4" = 112,

    /**Б5*/
    "Б5" = 113,

    /**Б6*/
    "Б6" = 114,

    /**Б7*/
    "Б7" = 155,

    /**В1*/
    "В1" = 116,

    /**В2*/
    "В2" = 117,

    /**В3*/
    "В3" = 118,

    /**Г1*/
    "Г1" = 119,

    /**Д1*/
    "Д1" = 120,

    /**В21*/
    "В21" = 122,

    /**В22*/
    "В22" = 123,

    /**В23*/
    "В23" = 124,

    /**В31*/
    "В31" = 125,

    /**В31*/
    "В32" = 126,

    /**E1*/
    "E1" = 132,

    /**А10*/
    "А10" = 133,

    /**А11*/
    "А11" = 134,

    /**А12*/
    "А12" = 135,

    /**А13*/
    "А13" = 136,

    /**А14*/
    "А14" = 154,

    /**А15*/
    "А15" = 156,

    /**А16*/
    "А16" = 157,

    /**А17*/
    "А17" = 158,

    /**А18*/
    "А18" = 159,

    /**В24*/
    "В24" = 137,

    /**В33*/
    "В33" = 138,

    /**Ж1*/
    "Ж1" = 139,

    /**Г2*/
    "Г2" = 140,

    /**Г3*/
    "Г3" = 160,

    /////////////////////////////////////////////

    /**Complaint*/
    "Complaint" = 1000,

    /**ActOfContestation*/
    "ActOfContestation" = 1201,

    /**RequestForCorrection*/
    "RequestForCorrection" = 401,

    /**AppointingExpert*/
    "AppointingExpert" = 601,

    /**Декларация-съгласие.*/
    "Декларация-съгласие" = 606,

    /**Доклад и експертиза.*/
    "Доклад и експертиза" = 607,

    /**Искане за корекция на назначенията.*/
    "Искане за корекция на назначенията" = 608,

    /**Искане за определяне на възнаграждение на контрольор.*/
    "Искане за определяне на възнаграждение на контрольор" = 611,

    /**Искане за освобождаване на депозит.*/
    "Искане за освобождаване на депозит" = 610,

    /**отвод.*/
    "отвод" = 602,

    /**Искане за промяна на лицето.*/
    "Искане за промяна на лицето" = 603,

    /**Приемане на депозит.*/
    "Приемане на депозит" = 605,

    /**Становище по искането за промяна на лицето.*/
    "Становище по искането за промяна на лицето" = 612,

    /**Уведомление за липса на средства.*/
    "Уведомление за липса на средства" = 615,

    /**Уведомление за смяна на адреса за изпращане и кореспонденция.*/
    "Уведомление за смяна на адреса за изпращане и кореспонденция" = 613,

    /**Уведомление, че вещото лице не може да изготви експертизата в срок.*/
    "Уведомление, че вещото лице не може да изготви експертизата в срок" = 609,

    /**Акт за оповестяване*/
    "Акт за оповестяване" = 301,

    /**Служебна пререгистрация на клон*/
    "Служебна пререгистрация на клон" = 302,

    /**Уведомление от регистри на други държави*/
    "Уведомление от регистри на други държави" = 303,

    /**Уведомление от системата за взаимно свързване на регистрите относно клон*/
    "Уведомление от системата за взаимно свързване на регистрите относно клон" = 304,

    /**Уведомление от системата за взаимно свързване на регистрите относно преобразуване*/
    "Уведомление от системата за взаимно свързване на регистрите относно преобразуване" = 305,

    /**Самосезиране*/
    "Самосезиране" = 402,

    /**Сезиране при назначение*/
    "Сезиране при назначение" = 403,

    /**Допълнителна задача след вписване по партида*/
    "Допълнителна задача след вписване по партида" = 501,

    /**Искане за издаване на карта*/
    "Искане за издаване на карта" = 701,

    /**Искане за съгласие на ликвидатор*/
    "Искане за съгласие на ликвидатор" = 801,

    /**Удостоверение за запазена фирма/наименование*/
    "Удостоверение за запазена фирма/наименование" = 901,

    /**Разпореждане на съда за доокомплектоване*/
    "Разпореждане на съда за доокомплектоване" = 1101,

    /**Акт на съда по несъстоятелност*/
    "Акт на съда по несъстоятелност" = 1301,

    /**Удостоверение за актуално състояние*/
    "Удостоверение за актуално състояние" = 1401,

    /**Удостоверение за вписвания за определен период*/
    "Удостоверение за вписвания за определен период" = 1501,

    /**Удостоверение за обявявания за определен период*/
    "Удостоверение за обявявания за определен период" = 1601,

    /**Удостоверение за вписано обстоятелство*/
    "Удостоверение за вписано обстоятелство" = 1701,

    /**Удостоверение за обявяване или копие от обявен акт*/
    "Удостоверение за обявяване или копие от обявен акт" = 1801,

    /**Удостоверение за липса на вписано обстоятелство или обявен акт*/
    "Удостоверение за липса на вписано обстоятелство или обявен акт" = 1901,

    /**Копие от документ, въз основа на който е извършено вписване или заличаване*/
    "Копие от документ, въз основа на който е извършено вписване или заличаване" = 2001,

    /**Невъзможност на лицето*/
    "Невъзможност на лицето" = 604,

    /**Назначаване на ликвидатор системно*/
    "Назначаване на ликвидатор системно" = 614,

    /**Допълнителни полета*/
    "Допълнителни полета" = 201,

    /**Служебна пререгистрация по УАС*/
    "Служебна пререгистрация по УАС" = 2101,

}
TypeSystem.registerEnumInfo(ApplicationFormTypesBG, 'ApplicationFormTypesBG', moduleContext.moduleName)


export enum SubUICTypes {

    Undefined = 0,

    /**Основни данни*/
    MainCircumstances = 1,

    /**Прокура*/
    B1_Procura = 2,

    /**Клонове*/
    B2_Branch = 3,

    /**Залог на дружествен дял*/
    B3_Pledge_DD = 4,

    /**Залог на търговско предприятие*/
    B4_Pledge_TP = 5,

    /**Запор върху дружествен дял*/
    B5_Distraint_DD = 6,

    /**Ликвидация*/
    B6_Liquidation = 7,

    /**Действителни собственици*/
    B7_ActualOwner = 500,

    /**Прехвърляне*/
    V1_Transfer = 8,

    /**Преобразуване*/
    V2_Conversion = 9,

    /**Преустройство*/
    V3_Reorganization_K = 10,

    /**Несъстоятелност*/
    Bankruptcy = 11,

    /**Забележки*/
    Notes = 12,

    /**Обявени актове*/
    G1_ActAnnouncement = 13,

    /**Актуален учредителен акт Този тип се ползва за да визуализира част от полетата на G1_ActAnnouncement. Поради тази причина е dummy и не би трябвало да има subdeeds с такъв SubUICTYPE.*/
    ActualConstitutiveAct = 450,

    ActsDeclaredBankrupt = 451,

    FirmReserve = 14,

    AdditionalCircumstances = 15,

    Refusal = 100,

    Applicants = 200,

    CourtAct = 301,

    AnnouncementFromOtherRegister = 303,

    CourtBranchReg = 351,

    RequestForCorrection = 401,

    CertityForActualState = 501,

    AppointingExpert = 601,

    ReleaseAppointingExpert = 602,

    DemandIssueCard = 701,

    LiquidatorsAgreement = 801,

    CertificateForReserveFirm = 901,

    Complaint = 910,

    OrderForCompletion = 920,

    ActOfContestation = 930,

    ActualStateCertificate = 940,

    EntryByPeriodCertificate = 950,

    PublicationByPeriodCertificate = 960,

    EnteredCircumstancesCertificate = 970,

    ActOrCopyOfActCertificate = 980,

    MissingActsCertificate = 990,

    DocumentOfStatesCertificate = 1000,

    AppExtraFields = 666,

    OfficialUASRegistration = 456,

    ConformityWithTheLaw = 132,

    RemoveNonCompliance = 133,
}
TypeSystem.registerEnumInfo(SubUICTypes, 'SubUICTypes', moduleContext.moduleName)

export enum ElementHolderAdditionFlags {

    None = 0,

    SuspendedRights = 1,

    DeprivedOfDispositionalPower = 2,

    SuspendedRightsSecIns = 3,

    SuspendedRightsThirdIns = 4,

    DeprivedOfDispositionalPowerSecIns = 5,

    DeprivedOfDispositionalPowerThirdIns = 6,
}
TypeSystem.registerEnumInfo(ElementHolderAdditionFlags, 'ElementHolderAdditionFlags', moduleContext.moduleName)

export enum CompanyNameSuffixFlags {

    None = 0,

    Liquidation = 1,

    Insolvency = 2,

    InsolvencySecIns = 3,

    InsolvencyThirdIns = 4,

    Stabilization = 8
}
TypeSystem.registerEnumInfo(CompanyNameSuffixFlags, 'CompanyNameSuffixFlags', moduleContext.moduleName)

export enum FieldOperations {

    Add = 1,

    Erase = 2,

    Current = 3,
}
TypeSystem.registerEnumInfo(FieldOperations, 'FieldOperations', moduleContext.moduleName)

export enum EraseOperations {
    Erase = 0,

    EraseClause71 = 1,

    EraseClause74 = 2,

    EraseClause30 = 3,
}
TypeSystem.registerEnumInfo(EraseOperations, 'EraseOperations', moduleContext.moduleName)

export enum ApplicationState {

    New = 0,

    ForChange = 1,

    Preregistration = 2,

    Transformation = 3,
}
TypeSystem.registerEnumInfo(ApplicationState, 'ApplicationState', moduleContext.moduleName)

export enum ApplicationStatuses {

    /**неопределен*/
    Undefined = 0,

    /**Изпратена до съда*/
    SentToCourt = 2,

    /**Изчаква акт на съда*/
    WaitingCourtAct = 3,

    /**Изчаква 14 дневен срок*/
    Waiting14Days = 4,

    /**Не вписва*/
    NotEntered = 5,

    /**Обработва се*/
    Processing = 6,

    /**Отказ*/
    Refusal = 7,

    /**Прекратяване на рег. производство*/
    TerminationOfRegProcedure = 8,

    /**Поискано УАС от съда*/
    RequestedCSCFromTheCourt = 9,

    /**Спиране на рег. производство*/
    StopProceeding = 10,

    /**Възобновяване на рег. производство*/
    ResumeProceeding = 11,

    /**Не запазва фирма/наименование статус за заявление Д1*/
    NotReserved = 12,

    /**Изчакване на 3-дневен срок*/
    WaitingFor3DaysTerm = 13,

    /**Изчаква обработка на предходно заявление*/
    WaitingForProcessingPreviousApplication = 14,

    /**Указания*/
    Instruction = 15,

    /**Запазва фирма/наименование статус за заявление Д1*/
    Reserved = 16,

    /**заличава запазването на фирма/наименование статус за заявление Д1*/
    DeleteReservationCompany = 17,

    /**не заличава запазването на фирма/наименование статус за заявление Д1*/
    NotDeleteReservationCompany = 18,

    /**приетo*/
    Accepted = 19,

    /**вписано*/
    Entered = 20,

    /**вписване с отказ*/
    EnteredWithRefusal = 21,

    /**Чака плащане*/
    WaitingPayment = 22,

    /**Изпратено*/
    Sent = 23,

    /**Без промяна*/
    NoChange = 24,


    /**Прекратяване на производство по назначение*/
    StopAssignmentProceeding = 101,

    /**Прекратяване на производство*/
    IncomingRegistrationRefusal = 102,

    /**Прекратяване на производство по назначение*/
    StopNewAssignmentProceeding = 103,

    /**Приет документ по назначение. Това може да е декларация, депозит, искане за промяна на адреса*/
    AssignmentAccepted = 104,

    /**Акт за назначение*/
    AssignmentAct = 105,

    /**Акт за изменение на акт*/
    AssignmentNextAct = 106,

    /**Изчаква становище на назначено лице при искане за промяна на назначено лице от заявителя*/
    AssignmentWaitForAttitude = 107,

    AssignmentCognizatExpertReturn = 108,

    AssignmentCognizantPayedDepositNotification = 109,

    AssignmentApplicantAdditionalDepositNotification = 110,

    AssignmentCognizantRewardAndRestDeposit = 111,

    AssignmentAppointingControllerReward = 112,

    AssignmentLiquidatorPayedDepositNotification = 113,

    /**Поискан депозит от заинтересованите лица*/
    AssignmentLiquidatorInterestedPersonDeposit = 114,

    /**Уведомление за освобождаване на депозит*/
    AssignmentLiquidatorReleaseDeposit = 115,
}
TypeSystem.registerEnumInfo(ApplicationStatuses, 'ApplicationStatuses', moduleContext.moduleName)

export enum ActType {

    Undefined = 0,

    /**Оповестяване*/
    Announce = 1,

    /**Спиране на регистърно производство*/
    StopProceeding = 2,

    /**Възобновяване на регистърно производство*/
    ResumeProceeding = 3,

    /**Акт на съда за отмяна на отказ*/
    RefusalRevoke = 4,

    /**Чуждестранно лице*/
    ForeignPerson = 5,
}
TypeSystem.registerEnumInfo(ActType, 'ActType', moduleContext.moduleName)

export enum PassedFrom {
    Undefined = 0,

    Internal = 1,

    Internet = 2
}
TypeSystem.registerEnumInfo(PassedFrom, 'PassedFrom', moduleContext.moduleName)

export enum RefusalTypes {

    Undefined = -1,

    Full = 0,

    Partial = 1,

    /**Прекратяване на регистърното производство поради вече вписано обстоятелство или обявен акт БЕЗ ГЕНЕРИРАНЕ НА ДОКУМЕНТ*/
    InscribedCircumstances = 2,

    /**Прекратяване на регистърното производство, не подлежи на вписване или обявяване БЕЗ ГЕНЕРИРАНЕ НА ДОКУМЕНТ*/
    NotSubjectToInscription = 3,

    /**БЕЗ ГЕНЕРИРАНЕ НА ДОКУМЕНТ*/
    NotForEntry = 4,
}
TypeSystem.registerEnumInfo(RefusalTypes, 'RefusalTypes', moduleContext.moduleName)


export enum BankruptcyEntriesTypes {

    AnnouncedCompanies = 1,
    OpenProceedings = 2,
    AllEntries = 3
}
TypeSystem.registerEnumInfo(BankruptcyEntriesTypes, 'BankruptcyEntriesTypes', moduleContext.moduleName);

export enum UnassignedAssignmentSearchCriteriaFilter {
    ByIncomingNumber = 0,
    ByDocType = 1,
    ByPeriod = 2
}
TypeSystem.registerEnumInfo(UnassignedAssignmentSearchCriteriaFilter, 'UnassignedAssignmentSearchCriteriaFilter', moduleContext.moduleName);

export enum MasterAssignmentSearchCriteriaFilter {
    ByIncomingNumber = 0,
    ByOutgoingIncomingNumber = 1,
    ByCompanyName = 2
}
TypeSystem.registerEnumInfo(MasterAssignmentSearchCriteriaFilter, 'MasterAssignmentSearchCriteriaFilter', moduleContext.moduleName);

export enum MasterAssignmentSearchSearchMode {
    ByIncomingNumber = 1,

    ByOutgoingIncomingNumber = 2,
}
TypeSystem.registerEnumInfo(MasterAssignmentSearchSearchMode, 'MasterAssignmentSearchSearchMode', moduleContext.moduleName);