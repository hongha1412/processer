/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author HaVH
 *
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class NewProjectVO extends ManagerBaseVO implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = -8778009323641986054L;

    private List<StatusVO> lsProjectStatus;
}
