package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ProductsService {

    List<ProductResponseDTO> findAllAvailables();
    List<ProductResponseDTO> findAllDeleted();
    List<ProductResponseDTO> findAllBySupplierId(Integer id);
    ProductResponseDTO findById(Integer id)  throws ResourceNotFoundException;
    ProductRequestDTO findByIdUpdate(Integer id)  throws ResourceNotFoundException;
    ProductResponseDTO create(ProductRequestDTO request)  throws ResourceNotFoundException;
    ProductResponseDTO update(ProductRequestDTO request, Integer id)  throws ResourceNotFoundException;
    ProductResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable)  throws ResourceNotFoundException;
    long countAvailables();
}
