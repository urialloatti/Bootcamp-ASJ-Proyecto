package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "sector")
public class Sector {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "sector", nullable = false)
    private String sector;
    @Column(name = "is_available", nullable = false)
    private Integer available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public Sector() {
    }

    public Sector(Integer id, String sector, Integer available, Date createdAt) {
        this.id = id;
        this.sector = sector;
        this.available = available;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
