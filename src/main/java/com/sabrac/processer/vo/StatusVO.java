/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;
import java.util.List;

import com.sabrac.processer.model.Status;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author HaVH
 *
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class StatusVO extends ManagerBaseVO implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -2074637264868883650L;
    private int statusId;
    private String statusName;
    private List<Status> lsStatus;
}
