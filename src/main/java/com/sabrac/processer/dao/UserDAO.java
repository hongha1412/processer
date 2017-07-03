/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.User;

/**
 * @author HaVH
 *
 */
public interface UserDAO {

    public void persist(User transientInstance);
    public void attachDirty(User instance);
    public void attachClean(User instance);
    public void delete(User persistentInstance);
    public User merge(User detachedInstance);
    public User findById(int id);
    public List<User> findByExample(User instance);
}
