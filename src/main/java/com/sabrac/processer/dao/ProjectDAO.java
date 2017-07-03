/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Project;

/**
 * @author HaVH
 *
 */
public interface ProjectDAO {

    public void persist(Project transientInstance);
    public void attachDirty(Project instance);
    public void attachClean(Project instance);
    public void delete(Project persistentInstance);
    public Project merge(Project detachedInstance);
    public Project findById(int id);
    public List<Project> findByExample(Project instance);
}
