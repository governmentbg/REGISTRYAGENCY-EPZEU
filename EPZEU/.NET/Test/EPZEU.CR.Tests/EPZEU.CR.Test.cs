using EPZEU.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EPZEU.Tests
{
    [TestClass]
    public class EpzeuCrTest
    {
        [TestMethod]
        public void TestMethod1()
        {
        }

        public void CreatePackage()
        {
            //var applicationProcess = new ApplicationProcess()
            //{
            //    ApplicantID = 2,
            //    State = ProcessStates.New,
            //    Status = ProcessStatuses.InProcess,
            //    ApplicationProcessID = 1,
            //    UIC = "123123123",
            //    MainApplicationType = CR.Domain.ApplicationForms.ApplicationFormTypes.A4,
            //};

            //var applicationProcessEntity = Factory.Default.GetApplicationProcessEntity();
            //applicationProcessEntity.Create(applicationProcess);
            //applicationProcessEntity.Update(applicationProcess);
            //var applicationProcesses = applicationProcessEntity.Search(new ApplicationProcessSearchCriteria()
            //{
            //    ApplicationProcessID = 211,
            //    ApplicantID =2,
            //    MainApplicationType = CR.Domain.ApplicationForms.ApplicationFormTypes.A4,
            //    LoadOption = new ApplicationProcessLoadOption()
            //    {
            //        loadApplications = true,
            //        loadApplicationDocuments = true,
            //        loadApplicationContent = true,

            //    }
            //});

            //var applicationContent = new ApplicationProcessContent()
            //{
            //    ApplicationProcessID = applicationProcess.ApplicationProcessID,
            //    Type = ApplicationProcessContentTypes.ApplicationJSON,
            //};

            //var applicationProcessContentEntity = Factory.Default.GetApplicationProcessContentEntity();
            //applicationProcessContentEntity.Create(applicationContent);
            //applicationProcessContentEntity.Update (applicationContent);

           


            //var applicaiton = new Application()
            //{
            //    ApplicationProcessID = applicationProcess.ApplicationProcessID,
            //    Type = CR.Domain.ApplicationForms.ApplicationFormTypes.A4,
            //    ApplicationContentID = applicationContent.ApplicationProcessContentID,
            //    Order = 1,
            //};
           

            //var applicationEntity = Factory.Default.GetApplicationEntity();
            //applicationEntity.Create(applicaiton);
            //applicationEntity.Update(applicaiton);


            //var applProcContets = applicationProcessContentEntity.Search(new ApplicationProcessContentSearchCriteria()
            //{
            //    ApplicationIDs = new System.Collections.Generic.List<long>() { applicaiton.ApplicationID.Value },
            //    ApplicationProcessID = applicaiton.ApplicationProcessID,
            //});





            //var applicationDocuemnt = new ApplicationDocument()
            //{
            //    ApplicationID = applicaiton.ApplicationID,
            //    BackofficeGuid = Guid.NewGuid(),
            //    DocumentTypeID = 1,
            //    IsOriginal = true,
            //    Name = "Nofile.file"
            //};

            //var applicationDocumentEntity = Factory.Default.GetApplicationDocumentEntity();
            //applicationDocumentEntity.Create(applicationDocuemnt);
            //applicationDocumentEntity.Update(applicationDocuemnt);


            //var docs = applicationDocumentEntity.Search(new ApplicationDocumentSearchCriteria()
            //{
            //    ApplDocumentIDs = new System.Collections.Generic.List<long>() { applicationDocuemnt.ApplicationDocumentID.Value },
            //    ApplicationIDs = new System.Collections.Generic.List<long>() { applicationDocuemnt.ApplicationID.Value }

            //});

            //var applications = applicationEntity.Search(new ApplicationSearchCriteria()
            //{
            //    ApplicationIDs = new System.Collections.Generic.List<long>() { applicaiton.ApplicationID.Value },
            //    ApplicationProcessID = applicaiton.ApplicationProcessID,
            //    LoadOption = new ApplicationLoadOption()
            //    {
            //        loadApplicationContent = true,
            //        loadApplicationDocuments = true,
            //    }
            //});


            //applicationDocumentEntity.Delete(applicationDocuemnt);
            //applicationEntity.Delete(applicaiton);
            //applicationProcessContentEntity.Delete(applicationContent);            
            //applicationProcessEntity.Delete(applicationProcess);
        }
    }
}
