package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.services.PurchaseOrdersService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/purchase-orders")
public class PurchaseOrdersController {
    private final PurchaseOrdersService ordersService;

    public PurchaseOrdersController(PurchaseOrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @GetMapping()
    public ResponseEntity<List<PurchaseOrderResponseDTO>> getList() {
        return ResponseEntity.ok().body(this.ordersService.getAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<PurchaseOrderResponseDTO> getById(@PathVariable Integer id) {
        Optional<PurchaseOrderResponseDTO> optOrder = this.ordersService.getById(id);
        if (optOrder.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(optOrder.get());
    }

    @GetMapping("/u/{id}")
    public ResponseEntity<PurchaseOrderRequestDTO> getForUpdate(@PathVariable Integer id) {
        Optional<PurchaseOrderRequestDTO> optRequest = this.ordersService.getPurchaseForUpdate(id);
        if (optRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(optRequest.get());
    }

    @PostMapping
    public ResponseEntity<PurchaseOrderResponseDTO> postNew(@RequestBody PurchaseOrderRequestDTO request) {
        Optional<PurchaseOrderResponseDTO> optOrder = this.ordersService.createPurchase(request);
        if (optOrder.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(optOrder.get(), HttpStatusCode.valueOf(201));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseOrderResponseDTO> updateOrder(@PathVariable Integer id, @RequestBody PurchaseOrderRequestDTO request) {
        Optional<PurchaseOrderResponseDTO> optOrder = this.ordersService.updateById(id, request);
        if (optOrder.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(optOrder.get(), HttpStatusCode.valueOf(200));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<PurchaseOrderResponseDTO> deleteById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO setAvailable) {
        Optional<PurchaseOrderResponseDTO> optOrder = this.ordersService.cancelById(id, setAvailable);
        if (optOrder.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().body(optOrder.get());
    }

}
