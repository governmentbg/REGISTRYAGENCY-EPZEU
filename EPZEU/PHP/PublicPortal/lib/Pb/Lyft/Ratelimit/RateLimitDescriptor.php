<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: ratelimit.proto

namespace Pb\Lyft\Ratelimit;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * A RateLimitDescriptor is a list of hierarchical entries that are used by the service to
 * determine the final rate limit key and overall allowed limit. Here are some examples of how
 * they might be used for the domain "envoy".
 * 1) ["authenticated": "false"], ["ip_address": "10.0.0.1"]
 *    What it does: Limits all unauthenticated traffic for the IP address 10.0.0.1. The
 *    configuration supplies a default limit for the ip_address field. If there is a desire to raise
 *    the limit for 10.0.0.1 or block it entirely it can be specified directly in the
 *    configuration.
 * 2) ["authenticated": "false"], ["path": "/foo/bar"]
 *    What it does: Limits all unauthenticated traffic globally for a specific path (or prefix if
 *    configured that way in the service).
 * 3) ["authenticated": "false"], ["path": "/foo/bar"], ["ip_address": "10.0.0.1"]
 *    What it does: Limits unauthenticated traffic to a specific path for a specific IP address.
 *    Like (1) we can raise/block specific IP addresses if we want with an override configuration.
 * 4) ["authenticated": "true"], ["client_id": "foo"]
 *    What it does: Limits all traffic for an authenticated client "foo"
 * 5) ["authenticated": "true"], ["client_id": "foo"], ["path": "/foo/bar"]
 *    What it does: Limits traffic to a specific path for an authenticated client "foo"
 * The idea behind the API is that (1)/(2)/(3) and (4)/(5) can be sent in 1 request if desired.
 * This enables building complex application scenarios with a generic backend.
 *
 * Generated from protobuf message <code>pb.lyft.ratelimit.RateLimitDescriptor</code>
 */
class RateLimitDescriptor extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>repeated .pb.lyft.ratelimit.RateLimitDescriptor.Entry entries = 1;</code>
     */
    private $entries;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry[]|\Google\Protobuf\Internal\RepeatedField $entries
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Ratelimit::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>repeated .pb.lyft.ratelimit.RateLimitDescriptor.Entry entries = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getEntries()
    {
        return $this->entries;
    }

    /**
     * Generated from protobuf field <code>repeated .pb.lyft.ratelimit.RateLimitDescriptor.Entry entries = 1;</code>
     * @param \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setEntries($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Pb\Lyft\Ratelimit\RateLimitDescriptor\Entry::class);
        $this->entries = $arr;

        return $this;
    }

}

