package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ProductsService {

    List<ProductResponseDTO> findAllAvailables();
    List<ProductResponseDTO> findAllBySupplierId(Integer id);
    Optional<ProductResponseDTO> findById(Integer id);
    Optional<ProductRequestDTO> findByIdUpdate(Integer id);
    Optional<ProductResponseDTO> create(ProductRequestDTO request);
    Optional<ProductResponseDTO> update(ProductRequestDTO request, Integer id);
    Optional<ProductResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable);
}
