/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Status;

/**
 * @author HaVH
 *
 */
public interface StatusDAO {

    public void persist(Status transientInstance);
    public void attachDirty(Status instance);
    public void attachClean(Status instance);
    public void delete(Status persistentInstance);
    public Status merge(Status detachedInstance);
    public Status findById(int id);
    public List<Status> findByExample(Status instance);
}
