/**
 * 
 */
package com.sabrac.processer.business;

import java.util.List;

import com.sabrac.processer.dao.UserDAO;
import com.sabrac.processer.model.User;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class UserBusinessImpl implements UserBusiness {

    @Setter
    UserDAO userDAO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.UserBusiness#getUserById(int)
     */
    @Override
    public User getUserById(int id) {

        // Create user object with id
        User user = new User();
        user.setUId(id);
        // Set flag condition
        user.setUFlg((byte)0);

        // Call DAO process
        List<User> lsUser = userDAO.findByExample(user);

        // If no user found with id
        if (lsUser == null || lsUser.size() <= 0) {
            return null;
        }
        return lsUser.get(0);
    }

}
