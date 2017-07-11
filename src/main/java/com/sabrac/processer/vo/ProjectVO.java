/**
 * 
 */
package com.sabrac.processer.vo;

import lombok.Data;

/**
 * @author HaVH
 *
 */
@Data
public class ProjectVO {

    private int pjId;
    private String pjName;
    private StatusVO pjStatus;
    private int pjCapacity;
    private String pjAssginee;
    private String pjReceiveDate;
    private String pjSendDate;
    private String pjDeadLine;
    private String pjComment;
}
