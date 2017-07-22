/**
 * 
 */
package com.sabrac.processer.business;

import java.util.ArrayList;
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
        // Create condition object
        Type type = new Type();
        // Set condition available type only
        type.setTFlg((byte)0);
        // Get list available type
        List<Type> lsType = typeDAO.findByExample(type);
        // Check list type available
        if (lsType != null && lsType.size() > 0) {
            return lsType;
        }
        return new ArrayList<>();
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#convertToVO(com.sabrac.processer.model.Type)
     */
    @Override
    public TypeVO convertToVO(Type type) {
        // Create VO result object
        TypeVO typeVO = new TypeVO();
        // Set model data into VO object
        typeVO.setTypeId(type.getTId());
        typeVO.setTypeName(type.getTName());
        return typeVO;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#convertToModel(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public Type convertToModel(TypeVO typeVO) {
        Type type = new Type();
        type.setTId(typeVO.getTypeId());
        type.setTName(typeVO.getTypeName());
        // Default type available
        type.setTFlg((byte)0);
        return type;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#addType(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public Integer addType(TypeVO typeVO) {
        try {
            Type type = this.convertToModel(typeVO);
            // Clear id for auto increment
            type.setTId(null);
            typeDAO.persist(type);
            return type.getTId();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#updatetype(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public boolean updateType(TypeVO typeVO) {
        // Get type from vo
        Type type = this.convertToModel(typeVO);
        type = typeDAO.merge(type);
        if (type != null && type.getTId() >= 0) {
            return true;
        }
        return false;
    }

    /* (non-Javadoc)
     * @see com.sabrac.processer.business.TypeBusiness#deletetype(com.sabrac.processer.vo.TypeVO)
     */
    @Override
    public boolean deleteType(TypeVO typeVO) {
        // Get status from vo
        Type type = this.convertToModel(typeVO);
        if (typeDAO.findById(type.getTId()) != null) {
            typeDAO.delete(type);
            return true;
        }
        return false;
    }

}
