using Dapper;
using EPZEU.Applications.Models;
using EPZEU.Audit.Models;
using EPZEU.CMS.Models;
using EPZEU.Common.Models;
using EPZEU.Emails.Models;
using EPZEU.Nomenclatures.Models;
using EPZEU.ServiceLimits.Models;
using EPZEU.Users.Models;
using EPZEU.Utilities;
using Npgsql;
using NpgsqlTypes;
using System.Net;
using System.Text.Json;

namespace EPZEU
{
    public static class EPZEUStartupBootstrapper
    {
        public static void Run()
        {
            EPZEUStartupRegistrator.Current.Register();
        }
    }

    public class EPZEUStartupRegistrator : StartupRegistrator<EPZEUStartupRegistrator>
    {
        protected override void RegisterInternal()
        {
            NpgsqlConnection.GlobalTypeMapper.MapComposite<EmailRecipientDB>("eml.email_recipient");

            SqlMapper.AddTypeHandler(new PassThroughHandler<IPAddress>(NpgsqlDbType.Inet));
            SqlMapper.AddTypeHandler(new PassThroughHandler<JsonElement>(NpgsqlDbType.Jsonb));
            SqlMapper.AddTypeHandler(new NpgCustomParameterValueTypeHandler());

            SqlMapper.SetTypeMap(typeof(EmailMessage), DataContextHelper.ColumnMap<EmailMessage>());
            SqlMapper.SetTypeMap(typeof(EmailTemplate), DataContextHelper.ColumnMap<EmailTemplate>());

            SqlMapper.SetTypeMap(typeof(LogAction), DataContextHelper.ColumnMap<LogAction>());

            SqlMapper.SetTypeMap(typeof(AppParameter), DataContextHelper.ColumnMap<AppParameter>());

            SqlMapper.SetTypeMap(typeof(ApplicationType), DataContextHelper.ColumnMap<ApplicationType>());

            SqlMapper.SetTypeMap(typeof(DocumentTemplateField), DataContextHelper.ColumnMap<DocumentTemplateField>());
            SqlMapper.SetTypeMap(typeof(DocumentTemplate), DataContextHelper.ColumnMap<DocumentTemplate>());

            SqlMapper.SetTypeMap(typeof(IISDAService), DataContextHelper.ColumnMap<IISDAService>());

            SqlMapper.SetTypeMap(typeof(Page), DataContextHelper.ColumnMap<Page>());
            SqlMapper.SetTypeMap(typeof(StaticPage), DataContextHelper.ColumnMap<StaticPage>());
            SqlMapper.SetTypeMap(typeof(Label), DataContextHelper.ColumnMap<Label>());
            SqlMapper.SetTypeMap(typeof(Language), DataContextHelper.ColumnMap<Language>());

            SqlMapper.SetTypeMap(typeof(Service), DataContextHelper.ColumnMap<Service>());

            SqlMapper.SetTypeMap(typeof(User), DataContextHelper.ColumnMap<User>());
            SqlMapper.SetTypeMap(typeof(UserAuthentication), DataContextHelper.ColumnMap<UserAuthentication>());
            SqlMapper.SetTypeMap(typeof(UserPermission), DataContextHelper.ColumnMap<UserPermission>());
            SqlMapper.SetTypeMap(typeof(UserLoginAttempt), DataContextHelper.ColumnMap<UserLoginAttempt>());
            SqlMapper.SetTypeMap(typeof(UserLoginSession), DataContextHelper.ColumnMap<UserLoginSession>());
            SqlMapper.SetTypeMap(typeof(Certificate), DataContextHelper.ColumnMap<Certificate>());
            SqlMapper.SetTypeMap(typeof(UserProcess), DataContextHelper.ColumnMap<UserProcess>());
            SqlMapper.SetTypeMap(typeof(SpecialAccessUserType), DataContextHelper.ColumnMap<SpecialAccessUserType>());

            SqlMapper.SetTypeMap(typeof(Application), DataContextHelper.ColumnMap<Application>());

            SqlMapper.SetTypeMap(typeof(DataServiceLimit), DataContextHelper.ColumnMap<DataServiceLimit>());
            SqlMapper.SetTypeMap(typeof(DataServiceUserLimit), DataContextHelper.ColumnMap<DataServiceUserLimit>());
            SqlMapper.SetTypeMap(typeof(Notifications.Models.UserSubscription), DataContextHelper.ColumnMap<Notifications.Models.UserSubscription>());
        }
    }
}
