/**
 * 
 */
package com.sabrac.processer.utils;

import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

/**
 * @author HaVH
 *
 */
public class ProcesserInterceptor implements Interceptor {

    /**
     * 
     */
    private static final long serialVersionUID = 9159434202274205461L;

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.interceptor.Interceptor#destroy()
     */
    @Override
    public void destroy() {
    }

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.interceptor.Interceptor#init()
     */
    @Override
    public void init() {
    }

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.interceptor.Interceptor#intercept(com.opensymphony.xwork2.ActionInvocation)
     */
    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
        // Get request info
        HttpServletRequest req = ServletActionContext.getRequest();
        HttpSession session = req.getSession();
        ResourceBundle bundle = ResourceBundle.getBundle("global");
        List<String> loginRequireURL = Arrays.asList(bundle.getString("LoginRequireURL").split(","));

        for (String URL : loginRequireURL) {
            if (req.getRequestURI().contains(URL) && session.getAttribute("loginUser") == null) {
                return Action.LOGIN;
            }
        }
        return actionInvocation.invoke();
    }

}
