<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Pb\Lyft\Ratelimit;

/**
 */
class RateLimitServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * Determine whether rate limiting should take place.
     * @param \Pb\Lyft\Ratelimit\RateLimitRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function ShouldRateLimit(\Pb\Lyft\Ratelimit\RateLimitRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/pb.lyft.ratelimit.RateLimitService/ShouldRateLimit',
        $argument,
        ['\Pb\Lyft\Ratelimit\RateLimitResponse', 'decode'],
        $metadata, $options);
    }

}
