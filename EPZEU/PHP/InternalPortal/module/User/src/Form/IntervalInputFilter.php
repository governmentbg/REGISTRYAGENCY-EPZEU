<?php
/**
 * IntervalInputFilter class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\InputFilter\InputFilter;

class IntervalInputFilter {

	public function getInputFilter() {

		$inputFilter = new InputFilter();

		$inputFilter->add([
				'name' => 'days',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 999]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
		]);

		$inputFilter->add([
				'name' => 'hours',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 23]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
		]);

		$inputFilter->add([
				'name' => 'minutes',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 59]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
		]);

		$inputFilter->add([
				'name' => 'seconds',
				'required' => false,
				'validators' => [
					['name' => \Zend\Validator\Digits::class],
					['name' => \Zend\Validator\Between::class,
						'options' => ['min' => 0, 'max'	=> 59]
					],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
		]);

		$inputFilter->add([
				'name' => 'milliseconds',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 999]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
		]);

		return $inputFilter;

	}
}