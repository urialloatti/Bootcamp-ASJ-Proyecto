package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface SuppliersService {

    List<SupplierResponseDTO> findAllAvailables();
    List<SupplierResponseDTO> findAllDeleted();
    SupplierResponseDTO findById(Integer id) throws ResourceNotFoundException;
    SupplierRequestDTO findByIdUpdate(Integer id) throws ResourceNotFoundException;
    SupplierResponseDTO create(SupplierRequestDTO request) throws ResourceNotFoundException, BadRequestException;
    SupplierResponseDTO update(SupplierRequestDTO request, Integer id) throws ResourceNotFoundException;
    SupplierResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable) throws ResourceNotFoundException;
    boolean checkCuitExists(String cuit);
    long countAvailables();
}
