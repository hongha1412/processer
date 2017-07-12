/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.business.StatusBusiness;
import com.sabrac.processer.business.UserBusiness;
import com.sabrac.processer.model.User;
import com.sabrac.processer.vo.StatusVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class StatusAction extends ActionBase<StatusVO> {

    @Setter
    private StatusBusiness statusBusiness;
    @Setter
    private UserBusiness userBusiness;
    private StatusVO statusVO;

    /**
     * 
     */
    private static final long serialVersionUID = 2540434165216893778L;

    /* (non-Javadoc)
     * @see com.sabrac.processer.action.ActionBase#execute()
     */
    @Override
    public String execute() throws Exception {
        // Declare variable store user info
        User user = null;
        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // Create VO object
        statusVO = new StatusVO();

        // Check if login user info exists in session
        if (request.getSession().getAttribute("loginUser") != null) {
            // Get user info from session
            user = (User)request.getSession().getAttribute("loginUser");
        }
        // If user info exists
        if (user != null && user.getUUsername() != null) {
            // Set result to VO
            statusVO.setUserName(user.getUUsername());
        } else {
            // Return to view if not logged in
            this.setResult(new Gson().toJson(statusVO));
            return Action.SUCCESS;
        }
        // Set result VO
        this.setResult(new Gson().toJson(statusVO));
        return Action.SUCCESS;
    }

}
