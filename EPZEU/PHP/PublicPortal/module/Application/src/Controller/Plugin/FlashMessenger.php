<?php
/**
 * @link      http://github.com/zendframework/zend-mvc-plugin-flashmessenger for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

/**
 * Flash Messenger
 */
class FlashMessenger extends AbstractPlugin
{

	/**
	 * Default messages namespace
	 */
	const NAMESPACE_DEFAULT = 'default';

	/**
	 * Success messages namespace
	 */
	const NAMESPACE_SUCCESS = 'success';

	/**
	 * Warning messages namespace
	 */
	const NAMESPACE_WARNING = 'warning';

	/**
	 * Error messages namespace
	 */
	const NAMESPACE_ERROR = 'error';

	/**
	 * Info messages namespace
	 */
	const NAMESPACE_INFO = 'info';


	/**
	 * Messages from previous request
	 * @var array
	 */
	protected $messages = [];

	/**
	 * Whether a message has been added during this request
	 *
	 * @var bool
	 */
	protected $messageAdded = false;


	protected $cookieName = 'flashMessage';

	/**
	 * Add a message
	 *
	 * @param  string         $message
	 * @param  null|string    $namespace
	 * @param  null|int       $hops
	 * @return FlashMessenger Provides a fluent interface
	 */
	public function addMessage($message, $namespace = null, $hops = 1)
	{
		// Redirect
		$cookieMessage = base64_encode(json_encode(['namespace' => $namespace, 'message' => $message]));
    	setcookie($this->cookieName, $cookieMessage, null, '/');

    	// Current request
    	$this->messages = ['namespace' => $namespace, 'message' => $message];
    	return $this;
	}


	/**
	 * Get messages from a specific namespace
	 *
	 * @param  string         $namespace
	 * @return array
	 */
	public function getMessages($namespace = null) {

		if (!empty($this->messages)) {
			setcookie($this->cookieName, '', time() - 3600, '/');
			return $this->messages;
		}

		if (isset($_COOKIE[$this->cookieName])) {

			$this->messages = json_decode(base64_decode($_COOKIE[$this->cookieName]), true);

			if (empty($this->messages['namespace']) || empty($this->messages['message'])) {
				setcookie($this->cookieName, '', time() - 3600, '/');
				return [];
			}
		}

		setcookie($this->cookieName, '', time() - 3600, '/');
		return $this->messages;
	}

	/**
	 * Add a message with "info" type
	 *
	 * @param  string         $message
	 * @return FlashMessenger
	 */
	public function addInfoMessage($message)
	{
		$this->addMessage($message, self::NAMESPACE_INFO);
		return $this;
	}

	/**
	 * Add a message with "success" type
	 *
	 * @param  string         $message
	 * @return FlashMessenger
	 */
	public function addSuccessMessage($message)
	{
		$this->addMessage($message, self::NAMESPACE_SUCCESS);
		return $this;
	}

	/**
	 * Add a message with "warning" type
	 *
	 * @param string        $message
	 * @return FlashMessenger
	 */
	public function addWarningMessage($message)
	{
		$this->addMessage($message, self::NAMESPACE_WARNING);
		return $this;
	}

	/**
	 * Add a message with "error" type
	 *
	 * @param  string         $message
	 * @return FlashMessenger
	 */
	public function addErrorMessage($message)
	{
		$this->addMessage($message, self::NAMESPACE_ERROR);
		return $this;
	}

	/**
	 * Whether a specific namespace has messages
	 *
	 * @param  string         $namespace
	 * @return bool
	 */
	public function hasMessages($namespace = null)
	{
		return $this->getMessages() ? true : false;
	}

}
