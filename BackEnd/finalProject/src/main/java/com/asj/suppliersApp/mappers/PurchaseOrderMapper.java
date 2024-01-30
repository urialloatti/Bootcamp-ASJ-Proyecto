package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.dto.response.PurchaseProductResponseDTO;
import com.asj.suppliersApp.entities.PurchaseOrder;
import com.asj.suppliersApp.entities.PurchaseProduct;

import java.util.ArrayList;

public class PurchaseOrderMapper {

    public static PurchaseOrderResponseDTO getResponseFromOrder(PurchaseOrder order) {
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setId(order.getId());
        response.setSupplierName(order.getSupplier().getBrand());
        response.setDateArriving(order.getDateArrives());
        response.setShippingRequirements(order.getRequirements());
        response.setState(order.getState());
        response.setCreatedAt(order.getCreatedAt());
        response.setProducts(new ArrayList<>());
        double total = 0;
        for (PurchaseProduct product: order.getProducts()) {
            response.getProducts().add(getProductResponse(product));
            total += product.getPrice();
        }
        response.setTotal(total);
        response.setAvailable(order.getAvailable());
        return response;
    }

    public static PurchaseOrderRequestDTO getRequestFromOrder(PurchaseOrder order) {
        PurchaseOrderRequestDTO request = new PurchaseOrderRequestDTO();
        request.setSupplierId(order.getSupplier().getId());
        request.setDateArriving(order.getDateArrives());
        request.setShippingRequirements(order.getRequirements());
        request.setCreatedAt(order.getCreatedAt());
        request.setProducts(new ArrayList<>());
        request.setUserId(order.getUser().getId());
        for(PurchaseProduct product: order.getProducts()) {
            request.getProducts().add(getProductRequest(product));
        }
        return request;
    }

    public static PurchaseProductResponseDTO getProductResponse(PurchaseProduct product) {
        PurchaseProductResponseDTO response = new PurchaseProductResponseDTO();
        response.setId(product.getProduct().getId());
        response.setProductName(product.getProduct().getName());
        response.setPrice(product.getPrice());
        response.setProductQuantity(product.getQuantity());
        return  response;
    }

    public static PurchaseProductRequestDTO getProductRequest(PurchaseProduct product) {
        PurchaseProductRequestDTO request = new PurchaseProductRequestDTO();
        request.setProductId(product.getId());
        request.setProductQuantity(product.getQuantity());
        return  request;
    }

}
