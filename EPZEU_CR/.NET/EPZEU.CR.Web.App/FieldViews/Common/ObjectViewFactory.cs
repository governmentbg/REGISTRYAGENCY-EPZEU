using StructureMap;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public interface IObjectViewFactory
    {
        IObjectView CreateObjectView(object obj);
        IObjectView CreateObjectView<T>();
    }

    public class ObjectViewFactory : IObjectViewFactory
    {
        private IContainer _container = null;

        public ObjectViewFactory(IContainer container)
        {
            _container = container;
        }

        public IObjectView CreateObjectView(object obj)
        {
            return _container.GetInstance<IObjectView>(obj.GetType().FullName);
        }

        public IObjectView CreateObjectView<T>()
        {
            return _container.GetInstance<IObjectView>(typeof(T).FullName);
        }
    }
}
