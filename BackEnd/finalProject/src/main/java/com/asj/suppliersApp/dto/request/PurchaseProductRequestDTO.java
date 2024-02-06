package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PurchaseProductRequestDTO {
    @Min(value = 1, message = "El Id del producto debe ser un número positivo.")
    private Integer productId;
    @Min(value = 1, message = "La cantidad debe ser un número positivo.")
    private int productQuantity;

    public PurchaseProductRequestDTO() {
    }

    public PurchaseProductRequestDTO(Integer productId, int productQuantity) {
        this.productId = productId;
        this.productQuantity = productQuantity;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }
}
