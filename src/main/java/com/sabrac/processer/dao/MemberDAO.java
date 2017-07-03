/**
 * 
 */
package com.sabrac.processer.dao;

import java.util.List;

import com.sabrac.processer.model.Member;

/**
 * @author HaVH
 *
 */
public interface MemberDAO {

    public void persist(Member transientInstance);
    public void attachDirty(Member instance);
    public void attachClean(Member instance);
    public void delete(Member persistentInstance);
    public Member merge(Member detachedInstance);
    public Member findById(int id);
    public List<Member> findByExample(Member instance);
}
