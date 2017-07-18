/**
 * 
 */
package com.sabrac.processer.business;

import java.util.List;

import com.sabrac.processer.dao.TypeDAO;
import com.sabrac.processer.model.Type;
import com.sabrac.processer.vo.TypeVO;

import lombok.Setter;

/**
 * @author HaVH
 *
 */
public class TypeBusinessImpl implements TypeBusiness {

    @Setter
    private TypeDAO typeDAO;

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#getListType()
     */
    @Override
    public List<Type> getListType() {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#convertToVO(com.sabrac.processer.model.Type)
     */
    @Override
    public TypeVO convertToVO(Type status) {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#convertToModel(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public Type convertToModel(TypeVO typeVO) {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#addType(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public Integer addType(TypeVO typeVO) {
        // TODO Auto-generated method stub
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#updatetype(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public boolean updatetype(TypeVO typeVO) {
        // TODO Auto-generated method stub
        return false;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#deletetype(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public boolean deletetype(TypeVO typeVO) {
        // TODO Auto-generated method stub
        return false;
    }

}
