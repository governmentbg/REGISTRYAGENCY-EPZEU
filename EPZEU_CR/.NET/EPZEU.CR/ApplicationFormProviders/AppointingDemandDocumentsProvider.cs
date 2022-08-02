using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Common.Assignments;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със "Документи по искане за назначаване на вещи лица, проверители, контрольори, регистрирани одитори и ликвидатори".
    /// </summary>
    internal abstract class AppointingDemandDocumentsProvider<T> : ApplicationFormProviderBase<T>
    where T : AppointingDemandDocuments
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (application.UIC == null)
            {
                application.UIC = new Domain.Fields.UIC();
                application.UIC.IsNew = true;
            }

            switch (application.AppType)
            {
                case ApplicationFormTypes.AppointingDeclaration:
                case ApplicationFormTypes.AppointingReportAndExamination:
                case ApplicationFormTypes.AttitudeOfChangeRequest:
                case ApplicationFormTypes.NotificationOfLackOfMeans:
                case ApplicationFormTypes.NotificationOfExaminationImpossibility:

                    if (application.ApplicantInfo == null)
                        application.ApplicantInfo = new ApplicantInfo();

                    if (application.ApplicantInfo.ApplicantCapacity == null)
                        application.ApplicantInfo.ApplicantCapacity = new ApplicantCapacity();

                    application.ApplicantInfo.ApplicantCapacity.AssignedExpert = true;
                    break;
            }

            #region AdditionalData 

            string incomingNumber = null;
            int docNumber = 1;
            DateTime outgoingDate = new DateTime();
            string expertGuid = null;
            string name = null;
            string egn = null;
            string assignmentCorrectionNumber = null;

            if (initParams.AdditionalData != null)
            {
                if (initParams.AdditionalData.ContainsKey("incomingNumber"))
                    incomingNumber = initParams.AdditionalData["incomingNumber"];

                if (initParams.AdditionalData.ContainsKey("docNumber"))
                    docNumber = int.Parse(initParams.AdditionalData["docNumber"]);

                if (initParams.AdditionalData.ContainsKey("outgoingDate"))
                    DateTime.TryParse(initParams.AdditionalData["outgoingDate"], out outgoingDate);

                if (initParams.AdditionalData.ContainsKey("expertGuid"))
                    expertGuid = initParams.AdditionalData["expertGuid"];

                if (initParams.AdditionalData.ContainsKey("name"))
                    name = initParams.AdditionalData["name"];

                if (application.AppType == ApplicationFormTypes.AppointingChangeRequest && initParams.AdditionalData.ContainsKey("egn"))
                    egn = initParams.AdditionalData["egn"];

                if (application.AppType == ApplicationFormTypes.AttitudeOfChangeRequest && initParams.AdditionalData.ContainsKey("assignmentCorrectionNumber"))
                    assignmentCorrectionNumber = initParams.AdditionalData["assignmentCorrectionNumber"];
            }

            #endregion

            var assignment = await GetRequiredService<IAssignmentReportServiceClient>().GetAssignmentAsync(new Integration.EPZEU.Models.SearchCriteria.AssignmentSearchCriteria()
            {
                OutgoingIncomingNumber = incomingNumber,
                OutgoingSeqNumber = docNumber <= 0 ? 1 : docNumber,
                OutgoingNumberDate = outgoingDate
            });

            if (assignment != null)
            {
                application.OutgoingNumberX108 = new OutgoingNumberX108();
                application.OutgoingNumberX108.AppointingExpertType = (AppointingExpertType)assignment.AssignmentExpertType;
                application.AssignmentID = (long)assignment.AssignmentID;

                application.OutgoingNumberX108.Parts = new OutgoingNumber();
                application.OutgoingNumberX108.Parts.FullOutgoingNumberSpecified = true;
                application.OutgoingNumberX108.Parts.DocNumber = docNumber;
                application.OutgoingNumberX108.Parts.IncomingNumber = incomingNumber;
                application.OutgoingNumberX108.Parts.OutgoingDate = outgoingDate;

                application.AssignedExperts = new AssignedExperts();
                application.AssignedExperts.AssignedExpertList = new List<AssignedExpert>();

                application.AssignedExperts.AssignedExpertList.Add(new AssignedExpert()
                {
                    ExpertGuid = expertGuid,
                    Name = name,
                    EGN = egn
                });

                if (this.application.AppType ==  ApplicationFormTypes.AttitudeOfChangeRequest)
                {
                    application.AssignmentCorrectionNumber = new AssignmentCorrectionNumber();
                    application.AssignmentCorrectionNumber.Value = assignmentCorrectionNumber;
                }
            }
            else
                return new CNSys.OperationResult("CR_GL_INVALID_OUTGOING_NO_Е", "CR_GL_INVALID_OUTGOING_NO_Е");

            return result;
        }
    }
}