/**
 * 
 */
package com.sabrac.processer.business;

import java.util.List;

import com.sabrac.processer.model.Status;
import com.sabrac.processer.vo.StatusVO;

/**
 * @author HaVH
 *
 */
public interface StatusBusiness {

    public List<Status> getListStatus();
    public StatusVO convertToVO(Status status);
    public Status convertToModel(StatusVO statusVO);
    public Integer addStatus(StatusVO statusVO);
    public boolean updateStatus(StatusVO statusVO);
    public boolean deleteStatus(StatusVO statusVO);
}
