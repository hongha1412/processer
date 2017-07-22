/**
 * 
 */
package com.sabrac.processer.business;

import java.util.List;

import com.sabrac.processer.model.Type;
import com.sabrac.processer.vo.TypeVO;

/**
 * @author HaVH
 *
 */
public interface TypeBusiness {

    public List<Type> getListType();
    public TypeVO convertToVO(Type status);
    public Type convertToModel(TypeVO typeVO);
    public Integer addType(TypeVO typeVO);
    public boolean updateType(TypeVO typeVO);
    public boolean deleteType(TypeVO typeVO);
}
