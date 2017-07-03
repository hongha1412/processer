package com.sabrac.processer.dao;
// Generated Jun 29, 2017 10:48:29 AM by Hibernate Tools 5.2.3.Final

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;

import com.sabrac.processer.model.Type;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class Type.
 * @see com.sabrac.processer.model.Type
 * @author Hibernate Tools
 */
public class TypeDAOImpl implements TypeDAO {

    private static final Log log = LogFactory.getLog(TypeDAOImpl.class);

    private final SessionFactory sessionFactory = getSessionFactory();

    protected SessionFactory getSessionFactory() {
        try {
            return (SessionFactory) new InitialContext().lookup("SessionFactory");
        } catch (Exception e) {
            log.error("Could not locate SessionFactory in JNDI", e);
            throw new IllegalStateException("Could not locate SessionFactory in JNDI");
        }
    }

    public void persist(Type transientInstance) {
        log.debug("persisting Type instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        } catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }

    public void attachDirty(Type instance) {
        log.debug("attaching dirty Type instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(Type instance) {
        log.debug("attaching clean Type instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void delete(Type persistentInstance) {
        log.debug("deleting Type instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public Type merge(Type detachedInstance) {
        log.debug("merging Type instance");
        try {
            Type result = (Type) sessionFactory.getCurrentSession().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public Type findById(java.lang.Integer id) {
        log.debug("getting Type instance with id: " + id);
        try {
            Type instance = (Type) sessionFactory.getCurrentSession().get("com.sabrac.processer.model.Type", id);
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
    public List<Type> findByExample(Type instance) {
        log.debug("finding Type instance by example");
        try {
            List<Type> results = (List<Type>) sessionFactory.getCurrentSession()
                    .createCriteria("com.sabrac.processer.model.Type").add(create(instance)).list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }
}
