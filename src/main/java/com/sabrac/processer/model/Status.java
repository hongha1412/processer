package com.sabrac.processer.model;
// Generated Jul 3, 2017 3:14:44 PM by Hibernate Tools 5.2.3.Final

import java.util.HashSet;
import java.util.Set;

/**
 * Status generated by hbm2java
 */
public class Status implements java.io.Serializable {

    private Integer SId;
    private int SType;
    private String SName;
    private String SCustom;
    private byte SFlg;
    private Set<Project> projects = new HashSet<Project>(0);

    public Status() {
    }

    public Status(int SType, byte SFlg) {
        this.SType = SType;
        this.SFlg = SFlg;
    }

    public Status(int SType, String SName, String SCustom, byte SFlg, Set<Project> projects) {
        this.SType = SType;
        this.SName = SName;
        this.SCustom = SCustom;
        this.SFlg = SFlg;
        this.projects = projects;
    }

    public Integer getSId() {
        return this.SId;
    }

    public void setSId(Integer SId) {
        this.SId = SId;
    }

    public int getSType() {
        return this.SType;
    }

    public void setSType(int SType) {
        this.SType = SType;
    }

    public String getSName() {
        return this.SName;
    }

    public void setSName(String SName) {
        this.SName = SName;
    }

    public String getSCustom() {
        return this.SCustom;
    }

    public void setSCustom(String SCustom) {
        this.SCustom = SCustom;
    }

    public byte getSFlg() {
        return this.SFlg;
    }

    public void setSFlg(byte SFlg) {
        this.SFlg = SFlg;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

}