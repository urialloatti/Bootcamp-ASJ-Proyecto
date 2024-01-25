package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "code", nullable = false)
    private String code;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private Category category;
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column(name = "picture", nullable = false, columnDefinition = "TEXT")
    private String picture;
    @Column(name = "price", nullable = false)
    private double price;
    @Column(name = "is_available", nullable = false)
    private boolean available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public Product() {
    }

    public Product(Integer id, String name, String code, Supplier supplier, Category category, String description, String picture, double price, boolean available, Date createdAt, Date updatedAt) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.supplier = supplier;
        this.category = category;
        this.description = description;
        this.picture = picture;
        this.price = price;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Supplier getsupplier() {
        return supplier;
    }

    public void setsupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
