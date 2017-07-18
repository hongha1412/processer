/**
 * 
 */
package com.sabrac.processer.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.Action;
import com.sabrac.processer.business.TypeBusiness;
import com.sabrac.processer.utils.ProcesserUtils;
import com.sabrac.processer.vo.TypeVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class TypeAction extends ActionBase<TypeVO> {

    private TypeVO typeVO;
    @Setter
    private TypeBusiness typeBusiness;

    /**
     * 
     */
    private static final long serialVersionUID = 2594444461682026787L;

    /* (non-Javadoc)
     * @see com.sabrac.processer.action.ActionBase#execute()
     */
    @Override
    public String execute() throws Exception {
        // Get request info
        HttpServletRequest request = ServletActionContext.getRequest();
        // Create VO
        typeVO = new TypeVO();
        // Parse request data to VO
        typeVO = this.parseVO(ProcesserUtils.parseRequest(request), TypeVO.class);

        // Check request function
        if (typeVO.getFunction().equals("init")) {
            // Set login info
            this.setLoginUser(typeVO);
            // Set result data
            this.setResult(new Gson().toJson(typeVO));
        } else if (typeVO.getFunction().equals("update")) {
            
        } else if (typeVO.getFunction().equals("delete")) {
            
        }

        return Action.SUCCESS;
    }

}
