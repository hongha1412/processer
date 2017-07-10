/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.vo.IndexVO;

/**
 * @author HaVH
 *
 */
public class IndexAction extends ActionBase<IndexVO> {

    /**
     * 
     */
    private static final long serialVersionUID = -3044132322370559525L;

    private IndexVO indexVO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.action.ActionBase#execute()
     */
    @Override
    public String execute() throws Exception {

        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // If indexVO is not initial, create object
        if (indexVO == null) {
            indexVO = new IndexVO();
        }
        // Get login status from session and set to VO
        if (request.getSession().getAttribute("loginUser") != null) {
            indexVO.setLoggedIn(true);
        }

        // Set VO data to result
        this.setResult(new Gson().toJson(indexVO));

        return Action.SUCCESS;
    }

}
