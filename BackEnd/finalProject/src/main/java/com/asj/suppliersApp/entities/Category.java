package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "category", nullable = false)
    private String category;
    @Column(name = "is_available", nullable = false)
    private Boolean available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public Category() {
    }

    public Category(Integer id, String category, Boolean available, Date createdAt) {
        this.id = id;
        this.category = category;
        this.available = available;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
