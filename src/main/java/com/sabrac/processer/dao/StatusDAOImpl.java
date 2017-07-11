package com.sabrac.processer.dao;
// Generated Jun 22, 2017 12:05:02 PM by Hibernate Tools 5.2.3.Final

import java.util.List;
import javax.naming.InitialContext;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;

import com.sabrac.processer.model.Status;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class Status.
 * @see com.sabrac.processer.model.Status
 * @author Hibernate Tools
 */
@Transactional
public class StatusDAOImpl implements StatusDAO {

    private static final Log log = LogFactory.getLog(StatusDAOImpl.class);

    private SessionFactory sessionFactory;

    public StatusDAOImpl(SessionFactory sessionFactory) {
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

    public void persist(Status transientInstance) {
        log.debug("persisting Status instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        } catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }

    public void attachDirty(Status instance) {
        log.debug("attaching dirty Status instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(Status instance) {
        log.debug("attaching clean Status instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void delete(Status persistentInstance) {
        log.debug("deleting Status instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public Status merge(Status detachedInstance) {
        log.debug("merging Status instance");
        try {
            Status result = (Status) sessionFactory.getCurrentSession().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public Status findById(int id) {
        log.debug("getting Status instance with id: " + id);
        try {
            Status instance = (Status) sessionFactory.getCurrentSession().get("com.sabrac.processer.model.Status", id);
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
    public List<Status> findByExample(Status instance) {
        log.debug("finding Status instance by example");
        try {
            List<Status> results = (List<Status>) sessionFactory.getCurrentSession()
                    .createCriteria("com.sabrac.processer.model.Status").add(create(instance)).list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }
}
