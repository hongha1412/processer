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
import com.sabrac.processer.utils.ProcesserUtils;
import com.sabrac.processer.vo.IndexVO;
import com.sabrac.processer.vo.LoginVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class LoginAction extends ActionBase<LoginVO> {

    @Setter
    private LoginBusiness loginBusiness;

    private LoginVO loginVO;
    private final String INIT_FUNCTION = "init";
    private final String LOGIN_FUNCTION = "login";

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
        loginVO = this.parseVO(ProcesserUtils.parseRequest(request), LoginVO.class);

        // Check function call
        if (loginVO.getFunction().equals(LOGIN_FUNCTION)) {
            // Call validate login data function in business
            User rs = null;
            try {
                rs = loginBusiness.loginValidate(loginVO);
            } catch (Exception ex) {
                return Action.SUCCESS;
            }
    
            // Check login info is valid
            if (rs != null) {
                // Set user info to result return to view
                this.setResult(new Gson().toJson(rs));
                // Set user info into session
                request.getSession().setAttribute("loginUser", rs);
            }
        } else if (loginVO.getFunction().equals(INIT_FUNCTION)) {
            // Check if user logged in
            if (request.getSession().getAttribute("loginUser") != null) {
                // Set logged in flag into VO return to view
                IndexVO indexVO = new IndexVO();
                indexVO.setLoggedIn(true);
                this.setResult(new Gson().toJson(indexVO));
            }
        }
        return Action.SUCCESS;
    }
}
