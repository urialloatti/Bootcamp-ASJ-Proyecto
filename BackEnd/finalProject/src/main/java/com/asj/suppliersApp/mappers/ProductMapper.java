package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Product;
import com.asj.suppliersApp.entities.Supplier;

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
        response.setPrice(product.getPrice());
        response.setAvailable(product.isAvailable());
        return response;
    }

    public static Product getProductFromRequest(ProductRequestDTO request, Supplier supplier, Category category) {
        Product product = new Product();
        product.setName(request.getName());
        product.setsupplier(supplier);
        product.setCategory(category);
        product.setDescription(request.getDescription());
        product.setPicture(request.getPicture());
        product.setPrice(request.getPrice());
        return product;
    }

    public static Product getProductFromRequest(Product product, ProductRequestDTO request, Supplier supplier, Category category) {
        product.setName(request.getName());
        product.setsupplier(supplier);
        product.setCategory(category);
        product.setDescription(request.getDescription());
        product.setPicture(request.getPicture());
        product.setPrice(request.getPrice());
        return product;
    }

    public static ProductRequestDTO getRequestFromProduct(Product product) {
        ProductRequestDTO request = new ProductRequestDTO();
        request.setName(product.getName());
        request.setSupplierId(product.getsupplier().getId());
        request.setCategoryId(product.getCategory().getId());
        request.setPrice(product.getPrice());
        request.setDescription(product.getDescription());
        request.setPicture(product.getPicture());
        return request;
    }
}
