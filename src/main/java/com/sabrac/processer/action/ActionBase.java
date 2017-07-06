/**
 * 
 */
package com.sabrac.processer.action;

import com.google.gson.JsonObject;
import com.opensymphony.xwork2.ActionSupport;
import com.sabrac.processer.utils.ProcesserUtils;

import lombok.Getter;
import lombok.Setter;

/**
 * @author HaVH
 *
 */
public abstract class ActionBase<T> extends ActionSupport {

    /**
     * Result message return to view
     */
    @Getter
    @Setter
    private String result;

    private static final long serialVersionUID = -2059984471630647453L;

    /**
     * Parse JsobObject to VO
     * 
     * @param data JsonObject
     * @return VO
     * @throws InstantiationException
     * @throws IllegalAccessException
     */
    @SuppressWarnings("unchecked")
    public T parseVO(JsonObject data, Class<T> clazz) throws InstantiationException, IllegalAccessException {
        Object result = clazz.newInstance();
        data.keySet().stream().forEach(x -> {
            ProcesserUtils.set(result, x, data.get(x).getAsString());
        });
        return (T) result;
    }

    /* (non-Javadoc)
     * @see com.opensymphony.xwork2.ActionSupport#execute()
     */
    public abstract String execute() throws Exception;
}
