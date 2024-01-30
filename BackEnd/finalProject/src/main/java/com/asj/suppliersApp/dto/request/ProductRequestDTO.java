package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductRequestDTO {
    @NotNull(message = "El proveedor no puede ser nulo.")
    @Min(value = 1, message = "El Id del proveedor no es válido.")
    private Integer supplierId;
    @NotNull(message = "La categoría no puede ser nula.")
    @Min(value = 1, message = "El Id de la categoría no es válido.")
    private Integer categoryId;
    @NotBlank(message = "El nombre del producto no puede estar en blanco.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres")
    private String name;
    @NotBlank(message = "La descripción no puede estar vacía.")
    private String description;
    @NotNull(message = "El precio no puede ser nulo.")
    @Min(value = 1, message = "El precio debe ser un número positivo.")
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
