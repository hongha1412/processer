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
import com.sabrac.processer.utils.ProcesserUtils;
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
        // Get request from context
        HttpServletRequest request = ServletActionContext.getRequest();
        // Create VO object
        statusVO = new StatusVO();
        // Parse requested data to VO
        statusVO = this.parseVO(ProcesserUtils.parseRequest(request), StatusVO.class);

        // Check requested function
        if (statusVO.getFunction().equals("init")) {
            // Get login info
            this.setLoginUser(statusVO);
            // Return to view
            this.setResult(new Gson().toJson(statusVO));
        } else if (statusVO.getFunction().equals("new")) {
            Integer insertedId = statusBusiness.addStatus(statusVO);
            // Clear statusVO data
            statusVO = new StatusVO();
            // Set new Id into VO
            if (insertedId != null && insertedId >= 0) {
                statusVO.setStatusId(insertedId);
            }
        } else if (statusVO.getFunction().equals("update")) {
            boolean rs = statusBusiness.updateStatus(statusVO);
            int updateId = statusVO.getStatusId();
            // Clear statusVO data
            statusVO = new StatusVO();
            statusVO.setStatusId(updateId);

            if (rs) {
                // Set action result to success
                statusVO.setActionResult(true);
            } else {
                // Set action result to fail
                statusVO.setActionResult(false);
            }
        } else if (statusVO.getFunction().equals("delete")) {
            if (statusBusiness.deleteStatus(statusVO)) {
                // Clear statusVO data
                statusVO = new StatusVO();
                // Set action result to success
                statusVO.setActionResult(true);
            } else {
                // Clear statusVO data
                statusVO = new StatusVO();
                // Set action result to fail
                statusVO.setActionResult(false);
            }
        }

        // Get list status
        statusVO.setLsStatus(statusBusiness.getListStatus());
        // Set result VO and return to view
        this.setResult(new Gson().toJson(statusVO));
        return Action.SUCCESS;
    }

}
