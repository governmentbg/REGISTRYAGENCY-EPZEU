<?php
/**
 * FormElementErrors class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\View\Helper;

use Zend\Form\View\Helper\FormElementErrors as OriginalFormElementErrors;

class FormElementErrors extends OriginalFormElementErrors
{
    protected $messageCloseString     = '</li></ul>';
    protected $messageOpenFormat      = '<ul%s class="invalid-feedback"><li>';
    protected $messageSeparatorString = '</li><li>';
}