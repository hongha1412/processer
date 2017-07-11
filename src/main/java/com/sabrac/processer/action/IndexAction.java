/**
 * 
 */
package com.sabrac.processer.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.business.ProjectBusiness;
import com.sabrac.processer.model.Project;
import com.sabrac.processer.vo.IndexVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class IndexAction extends ActionBase<IndexVO> {

    /**
     * 
     */
    private static final long serialVersionUID = -3044132322370559525L;

    @Setter
    private ProjectBusiness projectBusiness;
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
        // Get list available project
        List<Project> projectList = projectBusiness.getListProject();
        // Set list available project into VO
        indexVO.setProjectList(projectList);

        // Set VO data to result
        this.setResult(new Gson().toJson(indexVO));

        return Action.SUCCESS;
    }

}
