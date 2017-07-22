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

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#convertToModel(com.sabrac.processer.vo.StatusVO)
     */
    @Override
    public Status convertToModel(StatusVO statusVO) {
        Status rs = new Status();
        rs.setSId(statusVO.getStatusId());
        // Default enable
        rs.setSFlg((byte)0);
        rs.setSName(statusVO.getStatusName());
        // Default not custom
        rs.setSCustom("");
        // Default type 0 => not dev yet
        rs.setSType(0);
        return rs;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#addStatus(com.sabrac.processer.model.Status)
     */
    @Override
    public Integer addStatus(StatusVO statusVO) {
        try {
            Status status = this.convertToModel(statusVO);
            // Clear id for auto increment
            status.setSId(null);
            statusDAO.persist(status);
            return status.getSId();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#updateStatus(com.sabrac.processer.vo.StatusVO)
     */
    @Override
    public boolean updateStatus(StatusVO statusVO) {
        // Get status from vo
        Status status = this.convertToModel(statusVO);
        status = statusDAO.merge(status);
        if (status != null && status.getSId() >= 0) {
            return true;
        }
        return false;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.StatusBusiness#deleteStatus(com.sabrac.processer.vo.StatusVO)
     */
    @Override
    public boolean deleteStatus(StatusVO statusVO) {
        // Get status from vo
        Status status = this.convertToModel(statusVO);
        if (statusDAO.findById(status.getSId()) != null) {
            statusDAO.delete(status);
            return true;
        }
        return false;
    }

}
