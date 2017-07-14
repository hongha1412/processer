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
    public boolean addStatus(StatusVO statusVO);
}
