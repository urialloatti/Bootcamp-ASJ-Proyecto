package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
public class PurchaseOrderResponseDTO {
    private Integer id;
    private Date dateArriving;
    private String shippingRequirements;
    private String supplierName;
    private List<PurchaseProductResponseDTO> products;
    private String state;
    private double total;
    private Date createdAt;
    private boolean available;

    public PurchaseOrderResponseDTO() {
    }

    public PurchaseOrderResponseDTO(Integer id, Date dateArriving, String shippingRequirements, String supplierName, List<PurchaseProductResponseDTO> products, String state, double total, Date createdAt, boolean available) {
        this.id = id;
        this.dateArriving = dateArriving;
        this.shippingRequirements = shippingRequirements;
        this.supplierName = supplierName;
        this.products = products;
        this.state = state;
        this.total = total;
        this.createdAt = createdAt;
        this.available = available;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public List<PurchaseProductResponseDTO> getProducts() {
        return products;
    }

    public void setProducts(List<PurchaseProductResponseDTO> products) {
        this.products = products;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
