package com.sabrac.processer.utils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class ProcesserFilter
 */
public class ProcesserFilter implements Filter {

    private ServletContext context;
    private List<String> requiredLogin = Arrays.asList("newproject.do");
    private final String LOGIN_URL = "login.do";

    /**
     * Default constructor.
     */
    public ProcesserFilter() {
    }

    /**
     * @see Filter#destroy()
     */
    public void destroy() {
    }

    /**
     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        HttpServletRequest req = (HttpServletRequest) request;
        String requestURI = req.getRequestURI();
        if (req.getSession().getAttribute("loginId") == null) {
            requiredLogin.stream().forEach(x -> {
                if (requestURI.contains(x)) {
                    try {
                        ((HttpServletResponse)response).sendRedirect(LOGIN_URL);
                        return;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
        }
        chain.doFilter(request, response);
    }

    /**
     * @see Filter#init(FilterConfig)
     */
    public void init(FilterConfig fConfig) throws ServletException {
        this.context = fConfig.getServletContext();
        String testParam = fConfig.getInitParameter("Test");
        this.context.log(testParam);
    }

}
