package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PurchaseOrderRequestDTO {
    @NotNull(message = "La fecha de entrega no puede estar vacía.")
    private Date dateArriving;
    @NotBlank(message = "Los requerimientos no pueden estar vacíos.")
    private String shippingRequirements;
    @NotNull(message = "El Id del proveedor no puede ser nulo.")
    @Min(value = 1, message = "El Id del proveedor debe ser un número positivo.")
    private Integer supplierId;
    @Valid
    @NotEmpty(message = "Debe cargar al menos un producto en la órden de compra.")
    private List<PurchaseProductRequestDTO> products;
    private Date createdAt;
    @Min(value = 1, message = "El Id del usuario debe ser un número positivo.")
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
