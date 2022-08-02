<?php
/**
 * AtLeastOneField class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;

class AtLeastOneField extends AbstractValidator
{
	const INVALID_INTERVAL  = 'invalidInterval';

	protected $messageTemplates = [
		self::INVALID_INTERVAL  => "GL_INVALID_TIME_FORMAT_L"
	];

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за поне едно попълнено от няколко полета
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($fieldArr, $context = null)
	{
		$options = $this->getOptions();

		$hasValue = false;

		foreach ($fieldArr as $field => $value) {
			if (in_array($field, $options['fields']))
				if ((int)$value)
					return true;
		}

		$this->error(self::INVALID_INTERVAL);
		return false;

	}
}