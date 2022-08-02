<?php
/**
 * RateLimitService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

use \Pb\Lyft\Ratelimit\RateLimitServiceClient;

class RateLimitService {

	const LIMIT_NOT_REACHED = 1;
	const LIMIT_REACHED = 2;

	/**
	 *
	 * @var array
	 */
	protected $config;

	protected $response;

	protected $winCache;

	protected $ttl = 10;

	public function __construct($config, $response, $winCache) {
		$this->config 	= $config;
		$this->response = $response;
		$this->winCache = $winCache;
	}

	/**
	 * Проверява за достигнат лимит на обръщения към даден адрес
	 *
	 * @param string $key
	 * @param string $value
	 * @return bool
	 */
	public function isRateLimitReached($key, $value, $isBaseLimitReached = false) {

		try {
			if ($this->config['GL_SERVICE_LIMIT_DISABLED'] !== 0)
				return false;

			if ($isRateLimitServerDown = $this->winCache->getItem('isRateLimitServerDown'))
				return false;

			$client = new \Pb\Lyft\Ratelimit\RateLimitServiceClient(
					$this->config['GL_SERVICE_LIMIT_SERVER'], [
						'credentials' => \Grpc\ChannelCredentials::createInsecure(),
					]);

			// RateLimitRequest Обект
			$request = new \Pb\Lyft\Ratelimit\RateLimitRequest();
			$request->setDomain($this->config['GL_SERVICE_LIMIT_DOMAIN']);

			if (!$isBaseLimitReached) {
				// Descriptor Entry - контейнер с параметри за дескриптор
				$entry = new \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry();
				$entry->setKey($key);
				$entry->setValue($value);

				// Descriptor обект
				$rateLimitDescriptor = new \Pb\Lyft\Ratelimit\RateLimitDescriptor();
				$rateLimitDescriptor->setEntries([$entry]);


				// Базов лимит
				$entry = new \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry();
				$entry->setKey('BASE_DATA_SERVICE_LIMIT');
				$entry->setValue($value);

				$baseRateLimitDescriptor = new \Pb\Lyft\Ratelimit\RateLimitDescriptor();
				$baseRateLimitDescriptor->setEntries([$entry]);

				$request->setDescriptors([$rateLimitDescriptor, $baseRateLimitDescriptor]);
			}

			else {

				// Descriptor Entry - контейнер с параметри за дескриптор
				$entry = new \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry();
				$entry->setKey('BASE_DATA_SERVICE_LIMIT');
				$entry->setValue($value);

				// Descriptor обект
				$baseRateLimitDescriptor = new \Pb\Lyft\Ratelimit\RateLimitDescriptor();
				$baseRateLimitDescriptor->setEntries([$entry]);

				$request->setDescriptors([$baseRateLimitDescriptor]);
			}

			list($reply, $status) = $client->ShouldRateLimit($request)->wait();

			if (!$reply instanceof \Pb\Lyft\Ratelimit\RateLimitResponse) {
				$this->checkStatusCode($status);
				return false;
			}

			$this->checkStatusCode($status);

			if ($reply->getOverallCode() == self::LIMIT_REACHED) {
				$this->response->setStatusCode(429)->setReasonPhrase('Too Many Requests');
				return true;
			}

			return false;

		}
		catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Проверява за успешна връзка с рейт лимит сървъра. При неуспех се прилага circuit breaker pattern.
	 * @param unknown $status
	 */
	public function checkStatusCode($status) {
		if (property_exists($status , 'code') && $status->code) {
			$cacheOptions = $this->winCache->getOptions();
			$oldTtl = $cacheOptions->getTtl();
			$cacheOptions->setTtl($this->ttl);
			$this->winCache->setItem('isRateLimitServerDown', true);
			$cacheOptions->setTtl($oldTtl);
			return false;
		}
	}

}