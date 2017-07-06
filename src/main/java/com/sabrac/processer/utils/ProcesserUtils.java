/**
 * 
 */
package com.sabrac.processer.utils;

import java.io.IOException;
import java.lang.reflect.Field;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;

/**
 * @author HaVH
 *
 */
public class ProcesserUtils {

    /**
     * Parse request reader to json object
     * 
     * @param request HttpServletRequest
     * @return JSon json object
     * @throws IOException 
     * @throws JsonIOException 
     * @throws JsonSyntaxException 
     */
    public static JsonObject parseRequest(HttpServletRequest request) throws JsonSyntaxException, JsonIOException, IOException {
        return new Gson().fromJson(request.getReader(), JsonObject.class);
    }

    /**
     * Set value for unknow type object
     * 
     * @param object
     * @param fieldName
     * @param fieldValue
     * @return true: success / false: fail
     */
    public static boolean set(Object object, String fieldName, Object fieldValue) {
        Class<?> clazz = object.getClass();
        while (clazz != null) {
            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);
                field.set(object, fieldValue);
                return true;
            } catch (NoSuchFieldException e) {
                clazz = clazz.getSuperclass();
            } catch (Exception e) {
                throw new IllegalStateException(e);
            }
        }
        return false;
    }

    /**
     * Get value of field for unknow type object
     * 
     * @param object
     * @param fieldName
     * @return value of field
     */
    @SuppressWarnings("unchecked")
    public static <V> V get(Object object, String fieldName) {
        Class<?> clazz = object.getClass();
        while (clazz != null) {
            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);
                return (V) field.get(object);
            } catch (NoSuchFieldException e) {
                clazz = clazz.getSuperclass();
            } catch (Exception e) {
                throw new IllegalStateException(e);
            }
        }
        return null;
    }
}
