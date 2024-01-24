package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductRequestDTO {
    private Integer supplierId;
    private Integer categoryId;
    private String name;
    private String description;
    private double price;
    private String picture;

    public ProductRequestDTO() {
    }

    public ProductRequestDTO(Integer supplierId, Integer categoryId, String name, String description, double price, String picture) {
        this.supplierId = supplierId;
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
