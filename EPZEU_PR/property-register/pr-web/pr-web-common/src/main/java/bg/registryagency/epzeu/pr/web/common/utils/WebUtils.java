package bg.registryagency.epzeu.pr.web.common.utils;

public final class WebUtils {
    private WebUtils() {}

    /**
     * Resolve Remove Address as removing of port from remote address if exists.
     * @param remoteAddr remote address for resolving
     * @return corrected remote address without port, consists only IP address
     */
    public final static String resolveRemoteAddress(String remoteAddr) {
        int indexOfPort = remoteAddr.indexOf(':');
        if (indexOfPort != -1) {
            remoteAddr = remoteAddr.substring(0, indexOfPort);
        }

        return remoteAddr;
    }
}
