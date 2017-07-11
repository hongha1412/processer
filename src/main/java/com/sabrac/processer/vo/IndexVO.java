/**
 * 
 */
package com.sabrac.processer.vo;

import java.io.Serializable;
import java.util.List;

import com.sabrac.processer.model.Project;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author HaVH
 *
 */
@Data
@NoArgsConstructor
public class IndexVO implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -7309070744554650786L;

    private boolean isLoggedIn = false;
    private List<Project> projectList;
}
