package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;

import java.util.List;
import java.util.Optional;

public interface SuppliersService {

    List<SupplierResponseDTO> findAllAvailables();
    Optional<SupplierResponseDTO> findById(Integer id);
    Optional<SupplierRequestDTO> findByIdUpdate(Integer id);
    Optional<SupplierResponseDTO> create(SupplierRequestDTO request);
    Optional<SupplierResponseDTO> update(SupplierRequestDTO request, Integer id);
    Optional<SupplierResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable);
    boolean checkCuitExists(String cuit);
}
