<?php
namespace Application\View\Helper;


use Zend\Form\View\Helper\AbstractHelper;

class PublicUrlHelper extends AbstractHelper
{

	protected $config;

	public function __construct($config) {
		$this->config = $config;
	}

	public function __invoke(array $uriSegments = [], array $queryParams = [], array $replaceParams = []) {

		$url = $this->config['GL_EPZEU_PUBLIC_UI_URL'].$this->config['public_url_suffix'];

		$uriSegmentString = '';

		if ($uriSegments)
			$uriSegmentString = implode('/', $uriSegments);

		$url .= $uriSegmentString;

		$queryString = '';
		if ($queryParams)
			$queryString = '?'.http_build_query($queryParams);

		$url .= $queryString;

		if ($replaceParams) {
			foreach ($replaceParams as $key => $value) {
				$url = str_replace($key, $value, $url);
			}
		}

		$url = preg_replace('/([^:])(\/{2,})/', '$1/', $url);

		return $url;
	}
}