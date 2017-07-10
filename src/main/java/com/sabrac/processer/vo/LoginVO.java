/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author HaVH
 *
 */
@Data
@NoArgsConstructor
public class LoginVO implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 165047371291528187L;

    private Integer id;
    private String function;
    private String userName;
    private String password;

}
