package com.sabrac.processer.dao;
// Generated Jun 22, 2017 12:05:02 PM by Hibernate Tools 5.2.3.Final

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;

import com.sabrac.processer.model.Feedback;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class Feedback.
 * @see com.sabrac.processer.model.Feedback
 * @author Hibernate Tools
 */
public class FeedbackDAOImpl implements FeedbackDAO {

    private static final Log log = LogFactory.getLog(FeedbackDAOImpl.class);

    private final SessionFactory sessionFactory = getSessionFactory();

    protected SessionFactory getSessionFactory() {
        try {
            return (SessionFactory) new InitialContext().lookup("SessionFactory");
        } catch (Exception e) {
            log.error("Could not locate SessionFactory in JNDI", e);
            throw new IllegalStateException("Could not locate SessionFactory in JNDI");
        }
    }

    public void persist(Feedback transientInstance) {
        log.debug("persisting Feedback instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        } catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }

    public void attachDirty(Feedback instance) {
        log.debug("attaching dirty Feedback instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(Feedback instance) {
        log.debug("attaching clean Feedback instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void delete(Feedback persistentInstance) {
        log.debug("deleting Feedback instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public Feedback merge(Feedback detachedInstance) {
        log.debug("merging Feedback instance");
        try {
            Feedback result = (Feedback) sessionFactory.getCurrentSession().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public Feedback findById(int id) {
        log.debug("getting Feedback instance with id: " + id);
        try {
            Feedback instance = (Feedback) sessionFactory.getCurrentSession().get("com.sabrac.processer.model.Feedback",
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
    public List<Feedback> findByExample(Feedback instance) {
        log.debug("finding Feedback instance by example");
        try {
            List<Feedback> results = (List<Feedback>) sessionFactory.getCurrentSession()
                    .createCriteria("com.sabrac.processer.model.Feedback").add(create(instance)).list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }
}
