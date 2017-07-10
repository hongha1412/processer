/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.JsonObject;
import com.opensymphony.xwork2.ActionSupport;
import com.sabrac.processer.utils.ProcesserUtils;

import lombok.Getter;
import lombok.Setter;

/**
 * @author HaVH
 *
 */
public abstract class ActionBase<T> extends ActionSupport {

    /**
     * Result message return to view
     */
    @Getter
    @Setter
    private String result;

    private static final long serialVersionUID = -2059984471630647453L;

    /**
     * Parse JsobObject to VO
     * 
     * @param data JsonObject
     * @return VO
     * @throws InstantiationException
     * @throws IllegalAccessException
     */
    @SuppressWarnings("unchecked")
    public T parseVO(JsonObject data, Class<T> clazz) throws InstantiationException, IllegalAccessException {
        Object result = clazz.newInstance();
        data.keySet().stream().forEach(x -> {
            ProcesserUtils.set(result, x, data.get(x).getAsString());
        });
        return (T) result;
    }

    /**
     * Check login status in session
     * 
     * @return true: logged in / false: not logged in
     */
    public boolean checkLogin() {
        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // Get login id from session
        int loginId = -1;
        if (request.getSession().getAttribute("loginId") != null) {
            loginId = Integer.parseInt(request.getSession().getAttribute("loginId").toString());
        }
        // return result
        return loginId < 0 ? false : true;
    }

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.ActionSupport#execute()
     */
    public abstract String execute() throws Exception;
}
