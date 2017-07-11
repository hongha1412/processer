package com.sabrac.processer.dao;
// Generated Jun 22, 2017 12:05:02 PM by Hibernate Tools 5.2.3.Final

import java.util.List;
import javax.naming.InitialContext;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;

import com.sabrac.processer.model.Project;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class Project.
 * @see com.sabrac.processer.model.Project
 * @author Hibernate Tools
 */
@Transactional
public class ProjectDAOImpl implements ProjectDAO {

    private static final Log log = LogFactory.getLog(ProjectDAOImpl.class);

    private SessionFactory sessionFactory;

    public ProjectDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    protected SessionFactory getSessionFactory() {
        try {
            return (SessionFactory) new InitialContext().lookup("SessionFactory");
        } catch (Exception e) {
            log.error("Could not locate SessionFactory in JNDI", e);
            throw new IllegalStateException("Could not locate SessionFactory in JNDI");
        }
    }

    public void persist(Project transientInstance) {
        log.debug("persisting Project instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        } catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }

    public void attachDirty(Project instance) {
        log.debug("attaching dirty Project instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(Project instance) {
        log.debug("attaching clean Project instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void delete(Project persistentInstance) {
        log.debug("deleting Project instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public Project merge(Project detachedInstance) {
        log.debug("merging Project instance");
        try {
            Project result = (Project) sessionFactory.getCurrentSession().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public Project findById(int id) {
        log.debug("getting Project instance with id: " + id);
        try {
            Project instance = (Project) sessionFactory.getCurrentSession().get("com.sabrac.processer.model.Project",
                    id);
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

    @SuppressWarnings({ "unchecked", "deprecation" })
    public List<Project> findByExample(Project instance) {
        log.debug("finding Project instance by example");
        try {
            List<Project> results = (List<Project>) sessionFactory.getCurrentSession()
                    .createCriteria("com.sabrac.processer.model.Project").add(create(instance)).list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }
}
