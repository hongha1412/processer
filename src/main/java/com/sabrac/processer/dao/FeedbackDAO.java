/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Feedback;

/**
 * @author HaVH
 *
 */
public interface FeedbackDAO {

    public void persist(Feedback transientInstance);
    public void attachDirty(Feedback instance);
    public void attachClean(Feedback instance);
    public void delete(Feedback persistentInstance);
    public Feedback merge(Feedback detachedInstance);
    public Feedback findById(int id);
    public List<Feedback> findByExample(Feedback instance);
}
