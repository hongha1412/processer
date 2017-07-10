/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.business.UserBusiness;
import com.sabrac.processer.model.User;
import com.sabrac.processer.vo.NewProjectVO;

import lombok.Getter;
import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class NewProjectAction extends ActionBase<NewProjectVO> {

    /**
     * 
     */
    private static final long serialVersionUID = -5638100464095484591L;

    @Setter
    @Getter
    private NewProjectVO newProjectVO;

    @Setter
    private UserBusiness userBusiness;

    /* (non-Javadoc)
     * @see com.sabrac.processer.action.ActionBase#execute()
     */
    @Override
    public String execute() throws Exception {

        // Variable store user info of logged in user
        User rs = null;
        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // If NewProjectVO is not initial, create object
        if (newProjectVO == null) {
            newProjectVO = new NewProjectVO();
        }

        // Check if login id exists in session
        if (request.getSession().getAttribute("loginUser") != null) {
            // Get user info from session
            rs = (User)request.getSession().getAttribute("loginUser");
        }
        // If user info exists
        if (rs != null && rs.getUUsername() != null) {
            // Set result to VO
            newProjectVO.setUserName(rs.getUUsername());
            this.setResult(new Gson().toJson(newProjectVO));
        }

        return Action.SUCCESS;
    }

}
