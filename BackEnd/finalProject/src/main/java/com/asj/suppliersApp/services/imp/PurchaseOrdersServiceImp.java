package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.dto.response.PurchaseProductResponseDTO;
import com.asj.suppliersApp.entities.*;
import com.asj.suppliersApp.mappers.PurchaseOrderMapper;
import com.asj.suppliersApp.repositories.*;
import com.asj.suppliersApp.services.PurchaseOrdersService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseOrdersServiceImp implements PurchaseOrdersService {
    private final PurchaseOrderRepository orderRep;
    private final PurchaseProductRepository orderProductRep;
    private final SupplierRepository supplierRep;
    private final ProductRepository productRep;
    private final UserRepository userRep;

    public PurchaseOrdersServiceImp(PurchaseOrderRepository orderRep, PurchaseProductRepository orderProductRep, SupplierRepository supplierRep, ProductRepository productRep, UserRepository userRep) {
        this.orderRep = orderRep;
        this.orderProductRep = orderProductRep;
        this.supplierRep = supplierRep;
        this.productRep = productRep;
        this.userRep = userRep;
    }

    @Override
    public List<PurchaseOrderResponseDTO> getAll() {
        List<PurchaseOrder> orders = this.orderRep.findByAvailableTrue();
        List<PurchaseOrderResponseDTO> response = new ArrayList<PurchaseOrderResponseDTO>();
        for(PurchaseOrder order: orders) {
            response.add(PurchaseOrderMapper.getResponseFromOrder(order));
        }
        return response;
    }

    @Override
    public Optional<PurchaseOrderResponseDTO> getById(Integer id) {
        Optional<PurchaseOrder> optOrder = this.orderRep.findById(id);
        if (optOrder.isEmpty()) {
        return Optional.empty();
        }
        return Optional.of(PurchaseOrderMapper.getResponseFromOrder(optOrder.get()));
    }

    @Override
    public Optional<PurchaseOrderRequestDTO> getPurchaseForUpdate(Integer id) {
        Optional<PurchaseOrder> optOrder = this.orderRep.findById(id);
        if (optOrder.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(PurchaseOrderMapper.getRequestFromOrder(optOrder.get()));
    }

    @Override
    public Optional<PurchaseOrderResponseDTO> createPurchase(PurchaseOrderRequestDTO request) {
        Optional<PurchaseOrder> optOrder = this.getOrderFromRequest(request);
        if (optOrder.isEmpty()) {
        return Optional.empty();
        }
        PurchaseOrder order = optOrder.get();
        order.setAvailable(true);
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order.setState("Pendiente");
        order.setProducts(new ArrayList<>());
        order = this.orderRep.save(order);
        optOrder = this.fillOrderProducts(order, request);
        if (optOrder.isEmpty()) {
            return Optional.empty();
        }
        order = this.orderRep.save(order);
        return Optional.of(PurchaseOrderMapper.getResponseFromOrder(order));
    }

    @Override
    public Optional<PurchaseOrderResponseDTO> updateById(Integer id, PurchaseOrderRequestDTO request) {
        Optional<PurchaseOrder> optOrder = this.orderRep.findById(id);
        if (optOrder.isEmpty()) {
            return Optional.empty();
        }
        PurchaseOrder order = optOrder.get();
        order.setRequirements(request.getShippingRequirements());
        order.setDateArrives(request.getDateArriving());
        order.setCreatedAt(request.getCreatedAt());
        order.setUpdatedAt(new Date());
        order = this.orderRep.save(order);
        return Optional.of(PurchaseOrderMapper.getResponseFromOrder(order));
    }

    @Override
    public Optional<PurchaseOrderResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable) {
        Optional<PurchaseOrder> optOrder = this.orderRep.findById(id);
        if (optOrder.isEmpty()) {
            return Optional.empty();
        }
        PurchaseOrder order = optOrder.get();
        order.setAvailable(setAvailable.isAvailable());
        order.setUpdatedAt(new Date());
        order.setState("Cancelado");
        order = this.orderRep.save(order);
        return Optional.of(PurchaseOrderMapper.getResponseFromOrder(order));
    }

    private Optional<PurchaseOrder> getOrderFromRequest(PurchaseOrderRequestDTO request) {
        PurchaseOrder order = new PurchaseOrder();
        order.setRequirements(request.getShippingRequirements());
        order.setDateArrives(request.getDateArriving());
        order.setCreatedAt(request.getCreatedAt());
        Optional<Supplier> optSupplier = this.supplierRep.findById(request.getSupplierId());
        Optional<User> optUser = this.userRep.findById(request.getUserId());
        if( optUser.isEmpty() || optSupplier.isEmpty()) {
            return Optional.empty();
        }
        order.setSupplier(optSupplier.get());
        order.setUser(optUser.get());
        return Optional.of(order);
    }
    private Optional<PurchaseOrder> fillOrderProducts(PurchaseOrder order, PurchaseOrderRequestDTO request) {
        order.setProducts(new ArrayList<>());
        for (PurchaseProductRequestDTO productRequest: request.getProducts()) {
            PurchaseProduct product = new PurchaseProduct();
            Optional<Product> optProduct = this.productRep.findById(productRequest.getProductId());
            if (optProduct.isEmpty()) {
                return Optional.empty();
            }
            product.setProduct(optProduct.get());
            product.setPrice(optProduct.get().getPrice());
            product.setQuantity(productRequest.getProductQuantity());
            product.setPurchase(order);
            order.getProducts().add(product);
        }
        return Optional.of(order);
    }
}
