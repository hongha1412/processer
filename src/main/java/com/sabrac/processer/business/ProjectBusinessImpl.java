/**
 * 
 */
package com.sabrac.processer.business;

import java.util.ArrayList;
import java.util.List;

import com.sabrac.processer.dao.ProjectDAO;
import com.sabrac.processer.model.Project;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class ProjectBusinessImpl implements ProjectBusiness {

    @Setter
    private ProjectDAO projectDAO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.ProjectBusiness#getListProject()
     */
    @Override
    public List<Project> getListProject() {
        // Create condition object
        Project project = new Project();
        // Set available condition
        project.setPjFlg((byte)0);
        // Get list project available
        List<Project> lsProject = projectDAO.findByExample(project);
        // Check if no project found
        if (lsProject != null && lsProject.size() > 0) {
            return lsProject;
        }
        return new ArrayList<>();
    }

}
