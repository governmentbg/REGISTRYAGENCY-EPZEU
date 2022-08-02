using EPZEU.Nomenclatures.Repositories;
using EPZEU.Nomenclatures.Models;
using System.Threading.Tasks;
using CNSys.Data;
using CNSys;
using System.Threading;

namespace EPZEU.Nomenclatures
{
    /// <summary>
    /// Интерфейс на услугата за работа с етикетите на полетата.
    /// </summary>
    public interface ILabelService
    {
        /// <summary>
        /// Създаване на превод на етикета.
        /// </summary>
        /// <param name="labelTranslation">Ресурс, който да бъде преведен от чужд език.</param>
        void CreateLabelTranslation(LabelTranslation labelTranslation);

        /// <summary>
        /// Променяне на етикета
        /// </summary>
        /// <param name="label">Етикет, който да бъде променен.</param>
        void UpdateLabel(Label label);

        /// <summary>
        /// Променяне на превода на етикета.
        /// </summary>
        /// <param name="labelTranslation">Етикет, чиито превод да бъде променен.</param>
        void UpdateLabelTranslation(LabelTranslation labelTranslation);

        /// <summary>
        /// Критерии за търсене на етикет.
        /// </summary>
        /// <param name="labelSearchCriteria">Параметър съдържащ критериите за търсене на етикет.</param>
        /// <returns></returns>
        Task<OperationResult<CollectionInfo<Label>>> SearchLabel(LabelSearchCriteria labelSearchCriteria, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на услуга за работа с етикетите на полетата.
    /// </summary>
    public class LabelService : ILabelService
    {
        #region Private members

        private readonly ILabelRepository _labelRepository;
        private readonly ILabelTranslationRepository _labelTranslationRepository;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;

        #endregion

        #region Constructor

        public LabelService(ILabelRepository labelRepository, ILabelTranslationRepository labelTranslationRepository, IDbContextOperationExecutor dbContextOperationExecutor)
        {
            _labelRepository = labelRepository;
            _labelTranslationRepository = labelTranslationRepository;
            _dbContextOperationExecutor = dbContextOperationExecutor;
        }

        #endregion

        #region Public Interface

        public void CreateLabelTranslation(LabelTranslation labelTranslation)
        {
            _labelTranslationRepository.Create(labelTranslation);
        }

        public void UpdateLabel(Label label) {
            _labelRepository.Update(label);
        }

        public void UpdateLabelTranslation(LabelTranslation labelTranslation)
        {
            _labelTranslationRepository.Update(labelTranslation);
        }

        public Task<OperationResult<CollectionInfo<Label>>> SearchLabel(LabelSearchCriteria labelSearchCriteria, CancellationToken cancellationToken)
        {
            return _dbContextOperationExecutor.ExecuteAsync(async (dbContext, innerToken) =>
            {
                var items = await _labelRepository.SearchInfoAsync(labelSearchCriteria, cancellationToken);

                return new OperationResult<CollectionInfo<Label>>(OperationResultTypes.SuccessfullyCompleted)
                {
                    Result = items
                };
            }, cancellationToken);
        }

        #endregion
    }
}
