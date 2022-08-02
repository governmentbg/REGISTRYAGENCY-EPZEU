<?php
/**
 * MenuViewHelper class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class MenuViewHelper extends AbstractHelper {

	/**
	 *
	 * @var array
	 */
	protected $items = [];

	/**
	 *
	 * @var array
	 */
	protected $config;

	/**
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;

	/**
	 *
	 * @var MvcTranslator
	 */
	protected $translator;

	/**
	 *
	 * @var string
	 */
	protected $routeName;

	/**
	 *
	 * @var int
	 */
	protected $menuStateCookie;

	/**
	 *
	 * @var string
	 */
	protected $lang;

	public function __construct($config, $userService, $routeName, $translator, $lang) {

		$this->config = $config;

		$this->userService = $userService;

		$this->translator = $translator;

		$this->routeName = $routeName;

		$request = new \Zend\Http\PhpEnvironment\Request();
		$this->menuStateCookie = $request->getCookie() && $request->getCookie()->offsetExists('menu-state') ? $headCookie = $request->getCookie()->offsetGet('menu-state') : '';

		$this->lang = $lang;

	}

	/**
	 * Генерира навигация по даден ключ
	 *
	 * @param string $navigationKey
	 * @return string
	 */
	public function render($navigationKey) {

		$this->items = isset($this->config['navigation'][$navigationKey]) ? $this->config['navigation'][$navigationKey] : [];

		if (count($this->items)==0)
			return '';

		$result = '<ul>';

		foreach ($this->items as $item) {

			$permissionList = array_unique($this->getChildRoutes($item));

			$result .= $this->renderItem($item, $permissionList);
		}

		$result .= '</ul>';

		return $result;
	}


	/**
	 * Генерира елемент от навигацията
	 *
	 * @param array $item
	 * @param array $permissionList
	 * @param int $level
	 * @return string
	 */
	protected function renderItem($item, $permissionList, $level = 1) {

		$result = '';

		$urlHelper = $this->getView()->plugin('Url');

		$isAllowed = false;

		foreach ($permissionList as $resource) {
			if ($this->userService->isAllowed($resource)) {
				$isAllowed = true;
				break;
			}
		}

		if (isset($item['pages']) && !empty($item['pages'])) {

			if ($isAllowed) {

				$class = $this->routeName == $item['route']
				|| in_array($this->routeName, $permissionList)
				|| (isset($item['sub-routes']) && in_array($this->routeName, $item['sub-routes']))
				? ($level > 1 ? 'selected' : 'active') : "";


				$result .= '<li>';
				$result .= '<a href="#" class="'.$class.'">';

				if (isset($item['ico']))
					$result .= '<i class="'.$item['ico'].'"> </i> ';

				$result .= '<span>'.$this->translator->translate($item['label']).'</span>';

				if ($class != '')
					$result .= '<i class="ui-icon ui-icon-chevron-right collapse-arrow rotate-90" aria-hidden="true"></i>';
				else
					$result .= '<i class="ui-icon ui-icon-chevron-right collapse-arrow" aria-hidden="true"></i>';


				$result .= '</a>';

				$result .= '<ul class="collapse '.($class != '' && $this->menuStateCookie != 'collapse'? 'show' : '').'">';

				$level++;
				foreach ($item['pages'] as $pages)
					$result .= $this->renderItem($pages, $permissionList, $level);

				$result .= '</ul>';

				$result .= '</li>';

			}
		}

		else {

			$class = $this->routeName == $item['route'] ? ($level > 1 ? 'selected' : 'active') : "";

			if ( $this->userService->isAllowed($item['route'])) {
				$result .= '<li>';
				$result .= '<a href="'.$urlHelper($item['route'], ['lang' => $this->lang]).'" class="'.$class.'">';

				if (isset($item['ico']))
					$result .= '<i class="'.$item['ico'].'"> </i> ';

				$result .= '<span class="menu-text">'.$this->translator->translate($item['label']).'</span><span class="selected"></span>';
				$result .= '</a>';
				$result .= '</li>';
			}
		}

		return $result;
	}

	/**
	 * Взича имената на ресурсите на всички подменюта
	 *
	 * @param array $item
	 * @return array
	 */
	public function getChildRoutes($item) {

		$arr[] = $item['route'];

		if (isset($item['pages'])) {
			foreach ($item['pages'] as $subItem) {
				$arr[] = $this->getChildRoutes($subItem)[0];
			}
		}

		return $arr;
	}
}