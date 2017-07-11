/**
 * 
 */
package com.sabrac.processer.business;

import java.util.ArrayList;
import java.util.List;

import com.sabrac.processer.dao.StatusDAO;
import com.sabrac.processer.model.Status;
import com.sabrac.processer.vo.StatusVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class StatusBusinessImpl implements StatusBusiness {

    @Setter
    private StatusDAO statusDAO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#getListStatus()
     */
    @Override
    public List<Status> getListStatus() {
        // Create condition object
        Status status = new Status();
        // Set condition available status only
        status.setSFlg((byte)0);
        // Get list available status
        List<Status> lsStatus = statusDAO.findByExample(status);
        // Check list status available
        if (lsStatus != null && lsStatus.size() > 0) {
            return lsStatus;
        }
        return new ArrayList<>();
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#convertToVO(com.sabrac.processer.model.Status)
     */
    @Override
    public StatusVO convertToVO(Status status) {
        // Create VO result object
        StatusVO statusVO = new StatusVO();
        // Set model data into VO object
        statusVO.setStatusId(status.getSId());
        statusVO.setStatusName(status.getSName());
        return statusVO;
    }

}
