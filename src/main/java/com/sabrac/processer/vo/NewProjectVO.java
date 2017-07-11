/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

/**
 * @author HaVH
 *
 */
@Data
public class NewProjectVO implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -8778009323641986054L;

    private String userName;
    private List<StatusVO> lsProjectStatus;
}
