package com.sabrac.processer.dao;
// Generated Jun 23, 2017 11:32:35 AM by Hibernate Tools 5.2.3.Final

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;

import com.sabrac.processer.model.ProjectMember;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class ProjectMember.
 * @see com.sabrac.processer.model.ProjectMember
 * @author Hibernate Tools
 */
public class ProjectMemberDAOImpl implements ProjectMemberDAO {

    private static final Log log = LogFactory.getLog(ProjectMemberDAOImpl.class);

    private final SessionFactory sessionFactory = getSessionFactory();

    protected SessionFactory getSessionFactory() {
        try {
            return (SessionFactory) new InitialContext().lookup("SessionFactory");
        } catch (Exception e) {
            log.error("Could not locate SessionFactory in JNDI", e);
            throw new IllegalStateException("Could not locate SessionFactory in JNDI");
        }
    }

    public void persist(ProjectMember transientInstance) {
        log.debug("persisting ProjectMember instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        } catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }

    public void attachDirty(ProjectMember instance) {
        log.debug("attaching dirty ProjectMember instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(ProjectMember instance) {
        log.debug("attaching clean ProjectMember instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void delete(ProjectMember persistentInstance) {
        log.debug("deleting ProjectMember instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public ProjectMember merge(ProjectMember detachedInstance) {
        log.debug("merging ProjectMember instance");
        try {
            ProjectMember result = (ProjectMember) sessionFactory.getCurrentSession().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public ProjectMember findById(int id) {
        log.debug("getting ProjectMember instance with id: " + id);
        try {
            ProjectMember instance = (ProjectMember) sessionFactory.getCurrentSession()
                    .get("com.sabrac.processer.model.ProjectMember", id);
            if (instance == null) {
                log.debug("get successful, no instance found");
            } else {
                log.debug("get successful, instance found");
            }
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }

    @SuppressWarnings({ "deprecation", "unchecked" })
    public List<ProjectMember> findByExample(ProjectMember instance) {
        log.debug("finding ProjectMember instance by example");
        try {
            List<ProjectMember> results = (List<ProjectMember>) sessionFactory.getCurrentSession()
                    .createCriteria("com.sabrac.processer.model.ProjectMember").add(create(instance)).list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }
}
