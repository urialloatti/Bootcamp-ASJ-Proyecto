package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.dto.response.PurchaseProductResponseDTO;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrdersService {

    List<PurchaseOrderResponseDTO> getAll();
    PurchaseOrderResponseDTO getById(Integer id) throws ResourceNotFoundException;
    PurchaseOrderRequestDTO getPurchaseForUpdate(Integer id) throws ResourceNotFoundException;
    PurchaseOrderResponseDTO createPurchase(PurchaseOrderRequestDTO request) throws ResourceNotFoundException;
    PurchaseOrderResponseDTO updateById(Integer id, PurchaseOrderRequestDTO request) throws ResourceNotFoundException;
    PurchaseOrderResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable) throws ResourceNotFoundException;
    long countAvailables();
}
