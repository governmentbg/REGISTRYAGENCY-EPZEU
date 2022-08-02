using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using StructureMap;

namespace EPZEU.CR.ApplicationFormValidators
{
    public interface IApplicationValidatorFactory
    {
        IApplicationFormValidator CreateApplicationFormValidator(IApplicationForm form);
        IApplicationFormValidator CreateApplicationFormValidator(string appType);
    }

    internal class ApplicationValidatorFactory : IApplicationValidatorFactory
    {
        private IContainer _container = null;

        public ApplicationValidatorFactory(IEkatte ekatte, 
            IApplicationDocumentTypes applicationDocumentTypes, 
            IDeedReportServiceClient deedReportServiceClient, 
            IAssignmentReportServiceClient assignmentReportServiceClient,
            IApplicationServiceClient applicationServiceClient)
        {
            _container = new Container();

            _container.Configure((config) =>
            {
                config.For<IEkatte>().Use(ekatte);
                config.For<IApplicationDocumentTypes>().Use(applicationDocumentTypes);
                config.For<IDeedReportServiceClient>().Use(deedReportServiceClient);
                config.For<IAssignmentReportServiceClient>().Use(assignmentReportServiceClient);
                config.For<IApplicationServiceClient>().Use(applicationServiceClient);

                config.IncludeRegistry<ApplicationValidatorRegistry>();
            });
        }

        public IApplicationFormValidator CreateApplicationFormValidator(IApplicationForm form)
        {
            return _container.GetInstance<IApplicationFormValidator>(form.AppType.ToString());
        }

        public IApplicationFormValidator CreateApplicationFormValidator(string appType)
        {
            var instance = _container.GetInstance<IApplicationFormValidator>(appType);
            return instance;
        }
    }
}
