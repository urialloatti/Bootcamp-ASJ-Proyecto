package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.services.ProductsService;

import java.util.List;
import java.util.Optional;

public class ProductsServiceImp implements ProductsService {
    @Override
    public List<ProductResponseDTO> findAllAvailables() {
        return null;
    }

    @Override
    public List<ProductResponseDTO> findAllBySupplierId(Integer id) {
        return null;
    }

    @Override
    public Optional<ProductResponseDTO> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Optional<ProductResponseDTO> create(ProductRequestDTO product) {
        return Optional.empty();
    }

    @Override
    public Optional<ProductResponseDTO> update(ProductRequestDTO product, Integer id) {
        return Optional.empty();
    }

    @Override
    public Optional<ProductResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable) {
        return Optional.empty();
    }
}
