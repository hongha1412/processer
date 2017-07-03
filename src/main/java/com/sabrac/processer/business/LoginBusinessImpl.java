/**
 * 
 */
package com.sabrac.processer.business;

import java.util.List;

import com.sabrac.processer.dao.UserDAO;
import com.sabrac.processer.model.User;
import com.sabrac.processer.utils.Encrypter;
import com.sabrac.processer.vo.LoginVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class LoginBusinessImpl implements LoginBusiness {

    @Setter
    private UserDAO userDAO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.LoginBusiness#loginValidate()
     */
    public User loginValidate(LoginVO loginVO) {
        // Create user object with received username and password
        User userModel = this.convertVOToModel(loginVO);
        // Set flg for query condition
        userModel.setUFlg((byte)0);

        // Call DAO process
        List<User> lsUser = userDAO.findByExample(userModel);

        // if no user found with received username and password
        if (lsUser.isEmpty()) {
            return null;
        }
        return lsUser.get(0);
    }

    /**
     * Convert VO to Model objet
     * 
     * @param loginVO
     * @return user model
     */
    private User convertVOToModel(LoginVO loginVO) {
        User result = new User();
        result.setUUsername(loginVO.getUserName());
        result.setUPassword(Encrypter.encrypt(loginVO.getPassword()));
        return result;
    }

}
