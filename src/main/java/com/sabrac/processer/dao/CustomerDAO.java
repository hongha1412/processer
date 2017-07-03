/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Customer;

/**
 * @author HaVH
 *
 */
public interface CustomerDAO {

    public void persist(Customer transientInstance);
    public void attachDirty(Customer instance);
    public void attachClean(Customer instance);
    public void delete(Customer persistentInstance);
    public Customer merge(Customer detachedInstance);
    public Customer findById(java.lang.Integer id);
    public List<Customer> findByExample(Customer instance);
}
