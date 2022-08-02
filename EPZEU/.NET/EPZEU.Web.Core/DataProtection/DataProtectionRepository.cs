using CNSys.Data;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.Web.Protection
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип DataProtectionKey.
    /// </summary>
    public interface IDataProtectionRepository : IRepository<DataProtectionKey, string, object>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IDataProtectionEntity за поддържане и съхранение на обекти от тип DataProtectionKey.
    /// </summary>
    public class DataProtectionRepository : RepositoryBase<DataProtectionKey, string, object, DataProtectionDataContext>, IDataProtectionRepository
    {
        public DataProtectionRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        protected override IEnumerable<DataProtectionKey> SearchInternal(DataProtectionDataContext context, PagedDataState state, object searchCriteria)
        {
            List<DataProtectionKey> data = null;

            using (var res = context.DataProtectionKeysSearch())
            {
                data = res.Read<DataProtectionKey>().ToList();
            }

            return data;
        }

        protected override IEnumerable<DataProtectionKey> SearchInternal(DataProtectionDataContext context, object searchCriteria)
            => SearchInternal(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria);

        protected override void CreateInternal(DataProtectionDataContext context, DataProtectionKey item)
            => context.DataProtectionKeysCreate(item.ID, item.KeyXml, item.CreationDate, item.ActivationDate, item.ExpirationDate);
    }
}
