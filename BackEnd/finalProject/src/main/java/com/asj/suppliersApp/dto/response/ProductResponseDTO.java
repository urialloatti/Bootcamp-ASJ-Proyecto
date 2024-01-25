package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductResponseDTO {
    private int id;
    private String code;
    private String supplier;
    private String category;
    private String name;
    private String description;
    private double price;
    private String picture;

    public ProductResponseDTO() {
    }

    public ProductResponseDTO(int id, String code, String supplier, String category, String name, String description, double price, String picture) {
        this.id = id;
        this.code = code;
        this.supplier = supplier;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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
