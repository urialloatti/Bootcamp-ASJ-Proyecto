package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.entities.Product;

public class ProductMapper {

    public static ProductResponseDTO getProductResponse(Product product) {
        ProductResponseDTO response = new ProductResponseDTO();
        response.setId(product.getId());
        response.setCode(product.getCode());
        response.setSupplier(product.getsupplier().getBrand());
        response.setCategory(product.getCategory().getCategory());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPicture(product.getPicture());
        return response;
    }
}
