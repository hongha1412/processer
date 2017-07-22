/**
 * 
 */
package com.sabrac.processer.vo;

import java.util.List;

import com.sabrac.processer.model.Type;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author HaVH
 *
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class TypeVO extends ManagerBaseVO {

    private Integer typeId;
    private String typeName;
    private List<Type> lsType;
}
