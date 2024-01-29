package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.dto.response.PurchaseProductResponseDTO;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrdersService {

    List<PurchaseOrderResponseDTO> getAll();
    Optional<PurchaseOrderResponseDTO> getById(Integer id);
    Optional<PurchaseOrderRequestDTO> getPurchaseForUpdate(Integer id);
    Optional<PurchaseOrderResponseDTO> createPurchase(PurchaseOrderRequestDTO request);
    Optional<PurchaseOrderResponseDTO> updateById(Integer id, PurchaseOrderRequestDTO request);
    Optional<PurchaseOrderResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable);

}
