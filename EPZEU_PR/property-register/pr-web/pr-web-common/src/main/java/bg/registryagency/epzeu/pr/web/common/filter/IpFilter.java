package bg.registryagency.epzeu.pr.web.common.filter;

import bg.registryagency.epzeu.pr.web.common.utils.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
public class IpFilter extends OncePerRequestFilter {

    private final String[] restrictedPaths;
    private final List<IpAddressMatcher> ipMatchers;

    public IpFilter(String[] restrictedPaths, String[] allowedIpAddresses) {
        this.restrictedPaths = restrictedPaths;
        this.ipMatchers = new ArrayList<>();
        if(allowedIpAddresses != null && allowedIpAddresses.length != 0) {
            Arrays.stream(allowedIpAddresses).forEach(ipOrSubnet -> ipMatchers.add(new IpAddressMatcher(ipOrSubnet)));
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        if (!ipMatchers.isEmpty() && Arrays.stream(restrictedPaths).anyMatch(path -> request.getRequestURI().contains(path))) {
            String remoteAddr = WebUtils.resolveRemoteAddress(request.getRemoteAddr());

            if(!ipMatchers.stream().anyMatch(matcher -> matcher.matches(remoteAddr))) {
                log.warn("IP Address " + remoteAddr + " is not allowed for URI: " + request.getRequestURI());
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Unauthorized");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
