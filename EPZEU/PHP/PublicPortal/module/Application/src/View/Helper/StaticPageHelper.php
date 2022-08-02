<?php
/**
 * StaticPageHelper class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class StaticPageHelper extends AbstractHelper {

	const MODULE_EPZEU = 1;
	const MODULE_CR = 2;
	const MODULE_PR = 3;

	/**
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;

	protected $register;

	protected $staticPageList = null;

	protected $params = null;

	public function __construct($cacheService) {
		$this->cacheService = $cacheService;
	}

	public function setRegister($registerCode) {
		return $this->registerCode = $registerCode;
	}

	/**
	 * Взима статична страниза по ключ
	 *
	 * @param string $key
	 * @param array $replaceParams
	 * @return mixed|boolean
	 */
	public function getPage($key, $langCode, $replaceParams = []) {

		$staticPageList = $this->getStaticPageList();

		$url = '';

		if (isset($staticPageList[$key])) {

			$staticPageObj = $staticPageList[$key];

			$params = $this->getParams();

			switch ($staticPageObj->moduleID) {

				case self::MODULE_CR:
					$url = $params['GL_CR_PUBLIC_UI_URL'].'/'.$langCode.$staticPageList[$key]->url;
					break;

				case self::MODULE_PR:
					$url = $params['GL_PR_PUBLIC_UI_URL'].'/'.$langCode.$staticPageList[$key]->url;
					break;

				default:
					$url = $staticPageList[$key]->url;
					break;
			}

			if ($replaceParams) {
				foreach ($replaceParams as $key => $value) {
					$url = str_replace($key, $value, $url);
				}
			}

			$newStaticPageObj = clone $staticPageObj;

			$newStaticPageObj->url = \Application\Service\AppService::genUrl($url);

			return $newStaticPageObj;
		}

		return false;
	}


	public function getPageList($langCode) {

		$staticPageList = $this->getStaticPageList();

		$params = $this->getParams();

		$newPageListArray = [];

		if (is_array($staticPageList)) {
			foreach ($staticPageList as $pageKey => $staticPageObj) {

				switch ($staticPageObj->moduleID) {

					case self::MODULE_CR:
						$url = $params['GL_CR_PUBLIC_UI_URL'].'/'.$langCode.$staticPageObj->url;
						break;

					case self::MODULE_PR:
						$url = $params['GL_PR_PUBLIC_UI_URL'].'/'.$langCode.$staticPageObj->url;
						break;

					default:
						$url = $staticPageObj->url;
						break;
				}

				$tmpStaticPageObj = clone $staticPageObj;

				$tmpStaticPageObj->url = \Application\Service\AppService::genUrl($url);

				$newPageListArray[$pageKey] = $tmpStaticPageObj;

			}
		}

		return $newPageListArray;
	}

	/**
	 * Генерира URL от стринг.
	 *
	 * @param string $url
	 * @param string $langCode
	 * @param string $registerPrefix
	 */
	public function getUrlFromString($url, $langCode, $registerPrefix) {

		$params = $this->cacheService->getParamList();

		switch ($registerPrefix) {
			case 'GL_CR_PUBLIC_UI_URL':
			case 'GL_PR_PUBLIC_UI_URL':
				$prefix = $params[$registerPrefix];
				$url = $prefix.'/'.$langCode.$url;
				break;

			default:

				return '';
			break;
		}

		$url = \Application\Service\AppService::genUrl($url);

		return $url;
	}

	/**
	 *
	 */
	public function getStaticPageList() {

		if ($this->staticPageList)
			return $this->staticPageList;

		$this->staticPageList = $this->cacheService->getStaticPageList();
		return $this->staticPageList;
	}

	/**
	 *
	 */
	public function getParams() {

		if ($this->params)
			return $this->params;

		$this->params = $this->cacheService->getParamList();
		return $this->params;
	}
}