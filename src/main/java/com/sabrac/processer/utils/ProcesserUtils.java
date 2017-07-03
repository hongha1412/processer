/**
 * 
 */
package com.sabrac.processer.utils;

import java.io.BufferedReader;
import java.lang.reflect.Field;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

/**
 * @author HaVH
 *
 */
public class ProcesserUtils {

    /**
     * Parse request reader to json object
     * 
     * @param br request reader
     * @return JSon object
     */
    public static JsonObject parseRequest(BufferedReader br) {
        return new Gson().fromJson(br, JsonObject.class);
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
