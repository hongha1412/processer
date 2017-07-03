/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.business.LoginBusiness;
import com.sabrac.processer.model.User;
import com.sabrac.processer.vo.LoginVO;

import lombok.Getter;
import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class LoginAction extends ActionBase<LoginVO> {

    @Setter
    private LoginBusiness loginBusiness;

    @Getter
    @Setter
    private String result;

    private LoginVO loginVO;

    /**
     * 
     */
    private static final long serialVersionUID = -9101148711559903321L;

    /* (non-Javadoc)
     * @see com.sabrac.processer.action.ActionBase#execute()
     */
    @Override
    public String execute() throws Exception {

        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // Parse post data to vo data
        //loginVO = this.parseVO(ProcesserUtils.parseRequest(request.getReader()), LoginVO.class);
        // Call validate login data function in business
        User rs = loginBusiness.loginValidate(loginVO);

        // Check login info is valid
        if (rs != null) {
            // Set user info to result return to view
            result = new Gson().toJson(rs);
            // Set user info into session
            request.getSession().setAttribute("loginId", rs.getUId());
        } else {
            return Action.ERROR;
        }
        return Action.SUCCESS;
    }
}
