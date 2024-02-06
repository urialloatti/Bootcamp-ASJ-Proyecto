package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.dto.response.PurchaseProductResponseDTO;
import com.asj.suppliersApp.entities.*;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
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
    private final SupplierRepository supplierRep;
    private final ProductRepository productRep;
    private final UserRepository userRep;

    public PurchaseOrdersServiceImp(PurchaseOrderRepository orderRep, SupplierRepository supplierRep, ProductRepository productRep, UserRepository userRep) {
        this.orderRep = orderRep;
        this.supplierRep = supplierRep;
        this.productRep = productRep;
        this.userRep = userRep;
    }

    @Override
    public List<PurchaseOrderResponseDTO> getAll() {
        List<PurchaseOrder> orders = this.orderRep.findAll();
        List<PurchaseOrderResponseDTO> response = new ArrayList<PurchaseOrderResponseDTO>();
        for (PurchaseOrder order : orders) {
            response.add(PurchaseOrderMapper.getResponseFromOrder(this.checkDeliverDate(order)));
        }
        return response;
    }

    @Override
    public PurchaseOrderResponseDTO getById(Integer id) throws ResourceNotFoundException {
        PurchaseOrder order = this.getOrderIfExists(id);
        return PurchaseOrderMapper.getResponseFromOrder(this.checkDeliverDate(order));
    }

    @Override
    public PurchaseOrderRequestDTO getPurchaseForUpdate(Integer id) throws ResourceNotFoundException {
        PurchaseOrder order = this.getOrderIfExists(id);
        return PurchaseOrderMapper.getRequestFromOrder(order);
    }

    @Override
    public PurchaseOrderResponseDTO createPurchase(PurchaseOrderRequestDTO request) throws ResourceNotFoundException {
        PurchaseOrder order = this.getOrderFromRequest(request);
        order.setAvailable(true);
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order.setState("Pendiente");
        order.setProducts(new ArrayList<>());
        order = this.orderRep.save(order);
        order = this.fillOrderProducts(order, request);
        return PurchaseOrderMapper.getResponseFromOrder(this.orderRep.save(order));
    }

    @Override
    public PurchaseOrderResponseDTO updateById(Integer id, PurchaseOrderRequestDTO request) throws ResourceNotFoundException {
        PurchaseOrder order = this.getOrderIfExists(id);
        order.setRequirements(request.getShippingRequirements());
        order.setDateArrives(request.getDateArriving());
        order.setCreatedAt(request.getCreatedAt());
        order.setUpdatedAt(new Date());
        return PurchaseOrderMapper.getResponseFromOrder(this.orderRep.save(order));
    }

    @Override
    public PurchaseOrderResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable) throws ResourceNotFoundException {
        PurchaseOrder order = this.getOrderIfExists(id);
        order.setAvailable(setAvailable.isAvailable());
        order.setUpdatedAt(new Date());
        order.setState("Cancelado");
        order = this.orderRep.save(order);
        return PurchaseOrderMapper.getResponseFromOrder(order);
    }

    @Override
    public long countAvailables() {
        List<PurchaseOrder> orders = this.orderRep.findAll();
        for (PurchaseOrder order : orders) {
            this.checkDeliverDate(order);
        }
        return this.orderRep.countByAvailableTrueAndState("Pendiente");
    }

    private PurchaseOrder getOrderIfExists(Integer id) throws ResourceNotFoundException {
        return this.orderRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Órden de compra con el Id " + id + " no encontrada."));
    }

    private PurchaseOrder getOrderFromRequest(PurchaseOrderRequestDTO request) throws ResourceNotFoundException {
        PurchaseOrder order = new PurchaseOrder();
        order.setRequirements(request.getShippingRequirements());
        order.setDateArrives(request.getDateArriving());
        order.setCreatedAt(request.getCreatedAt());
        Supplier supplier = this.supplierRep.findById(request.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor con el Id " + request.getSupplierId() + " no encontrado."));
        User user = this.userRep.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario con el Id " + request.getUserId() + " no encontrado."));
        order.setSupplier(supplier);
        order.setUser(user);
        return order;
    }

    private PurchaseOrder fillOrderProducts(PurchaseOrder order, PurchaseOrderRequestDTO request) throws ResourceNotFoundException {
        order.setProducts(new ArrayList<>());
        for (PurchaseProductRequestDTO productRequest : request.getProducts()) {
            PurchaseProduct orderProduct = new PurchaseProduct();
            Product product = this.productRep.findById(productRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto con el Id " + productRequest.getProductId() + " no encontrado."));
            orderProduct.setProduct(product);
            orderProduct.setPrice(product.getPrice());
            orderProduct.setQuantity(productRequest.getProductQuantity());
            orderProduct.setPurchase(order);
            order.getProducts().add(orderProduct);
        }
        return order;
    }

    private PurchaseOrder checkDeliverDate(PurchaseOrder order) {
        Date today = new Date();
        if (order.getDateArrives().before(today)) {
            order.setState("Entregado");
            order.setAvailable(false);
            return this.orderRep.save(order);
        }
        return order;
    }
}
