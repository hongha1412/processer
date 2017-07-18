/**
 * 
 */
package com.sabrac.processer.action;

import java.lang.reflect.InvocationTargetException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts2.ServletActionContext;

import com.google.gson.JsonObject;
import com.opensymphony.xwork2.ActionSupport;
import com.sabrac.processer.model.User;
import com.sabrac.processer.vo.ManagerBaseVO;

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
     * @throws InvocationTargetException 
     * @throws NoSuchMethodException 
     */
    @SuppressWarnings("unchecked")
    public T parseVO(JsonObject data, Class<T> clazz) throws InstantiationException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        Object result = clazz.newInstance();
        for (String x : data.keySet()) {
            if (data.get(x).isJsonNull()) {
                PropertyUtils.setProperty(result, x, null);
            } else {
                BeanUtils.setProperty(result, x, data.get(x).getAsString());
            }
        }
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

    /**
     * Set logged in user into VO
     * 
     * @param baseVO
     */
    public void setLoginUser(ManagerBaseVO baseVO) {

        // Declare variable store user info
        User user = null;
        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();

        // Check if login user info exists in session
        if (request.getSession().getAttribute("loginUser") != null) {
            // Get user info from session
            user = (User)request.getSession().getAttribute("loginUser");
        }
        // If user info exists
        if (user != null && user.getUUsername() != null) {
            // Set result to VO
            baseVO.setUserName(user.getUUsername());
        }
    }

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.ActionSupport#execute()
     */
    public abstract String execute() throws Exception;
}
