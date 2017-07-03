/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.ProjectMember;

/**
 * @author HaVH
 *
 */
public interface ProjectMemberDAO {

    public void persist(ProjectMember transientInstance);
    public void attachDirty(ProjectMember instance);
    public void attachClean(ProjectMember instance);
    public void delete(ProjectMember persistentInstance);
    public ProjectMember merge(ProjectMember detachedInstance);
    public ProjectMember findById(int id);
    public List<ProjectMember> findByExample(ProjectMember instance);
}
