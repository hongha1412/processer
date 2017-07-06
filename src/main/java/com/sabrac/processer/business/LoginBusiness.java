/**
 * 
 */
package com.sabrac.processer.business;

import com.sabrac.processer.model.User;
import com.sabrac.processer.vo.LoginVO;

/**
 * @author HaVH
 *
 */
public interface LoginBusiness {

    public User loginValidate(LoginVO loginVO) throws Exception;
}
