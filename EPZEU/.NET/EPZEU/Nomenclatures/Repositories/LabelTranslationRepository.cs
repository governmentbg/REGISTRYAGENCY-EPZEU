using CNSys.Data;
using EPZEU.Nomenclatures.Models;

namespace EPZEU.Nomenclatures.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип LabelTranslation.
    /// </summary>
    public interface ILabelTranslationRepository : 
        IRepository<LabelTranslation, long?, LabelSearchCriteria>,
        IRepositoryAsync<LabelTranslation, long?, LabelSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс ILabelTranslationEntity за поддържане и съхранение на обекти от тип LabelTranslation.
    /// </summary>
    internal class LabelTranslationRepository : RepositoryBase<LabelTranslation, long?, LabelSearchCriteria, LabelDataContext>, ILabelTranslationRepository
    {
        #region Constructors

        public LabelTranslationRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected override void CreateInternal(LabelDataContext context, LabelTranslation item)
        {
            context.LabelTranslationCreate(item.LabelID, item.LanguageID, item.Value);
        }

        protected override void UpdateInternal(LabelDataContext context, LabelTranslation item)
        {
            context.LabelTranslationUpdate(item.LabelID,
                                    item.LanguageID,
                                    item.Value);
        }

        #endregion
    }
}
