<?php
/**
 * SearchFormHelperFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Content\View\Helper\SearchFormHelper;

class SearchFormHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return SearchFormHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return  new SearchFormHelper($container->get('FormElementManager')->get(\Content\Form\SearchForm::class));
	}
}