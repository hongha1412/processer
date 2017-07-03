/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Type;

/**
 * @author HaVH
 *
 */
public interface TypeDAO {

    public void persist(Type transientInstance);
    public void attachDirty(Type instance);
    public void attachClean(Type instance);
    public void delete(Type persistentInstance);
    public Type merge(Type detachedInstance);
    public Type findById(java.lang.Integer id);
    public List<Type> findByExample(Type instance);
}
