package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PurchaseOrderRequestDTO {
    private Date dateArriving;
    private String shippingRequirements;
    private Integer supplierId;
    private List<PurchaseProductRequestDTO> products;
    private Date createdAt;
    private Integer userId;

    public PurchaseOrderRequestDTO() {
    }
    public PurchaseOrderRequestDTO(Date dateArriving, String shippingRequirements, Integer supplierId, List<PurchaseProductRequestDTO> products, Date createdAt, Integer userId) {
        this.dateArriving = dateArriving;
        this.shippingRequirements = shippingRequirements;
        this.supplierId = supplierId;
        this.products = products;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    public Date getDateArriving() {
        return dateArriving;
    }

    public void setDateArriving(Date dateArriving) {
        this.dateArriving = dateArriving;
    }

    public String getShippingRequirements() {
        return shippingRequirements;
    }

    public void setShippingRequirements(String shippingRequirements) {
        this.shippingRequirements = shippingRequirements;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public List<PurchaseProductRequestDTO> getProducts() {
        return products;
    }

    public void setProducts(List<PurchaseProductRequestDTO> products) {
        this.products = products;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
