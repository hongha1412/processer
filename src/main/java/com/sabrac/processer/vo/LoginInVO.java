/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;

import lombok.Data;

/**
 * @author HaVH
 *
 */
@Data
public class LoginInVO implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 165047371291528187L;

    private String userName;
    private String password;

}
