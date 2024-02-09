package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseOrderRequestDTO;
import com.asj.suppliersApp.dto.request.PurchaseProductRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.PurchaseOrderResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestBodyChecker;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.services.PurchaseOrdersService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
    public ResponseEntity<ApiResponse<PurchaseOrderResponseDTO>> getById(@PathVariable Integer id) {
        try {
            PurchaseOrderResponseDTO response = this.ordersService.getById(id);
            return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/u/{id}")
    public ResponseEntity<ApiResponse<PurchaseOrderRequestDTO>> getOrderForUpdate(@PathVariable Integer id) {
        try {
            PurchaseOrderRequestDTO request = this.ordersService.getPurchaseForUpdate(id);
            return ResponseEntity.ok().body(new ApiResponse<>(request));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.status(200).body(this.ordersService.countAvailables());
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<PurchaseOrderResponseDTO>> postNew(@Valid @RequestBody PurchaseOrderRequestDTO request, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
            PurchaseOrderResponseDTO response = this.ordersService.createPurchase(request);
            return ResponseEntity.status(201).body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PurchaseOrderResponseDTO>> updateOrder(@PathVariable Integer id, @Valid @RequestBody PurchaseOrderRequestDTO request, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
            PurchaseOrderResponseDTO response = this.ordersService.updateById(id, request);
            return ResponseEntity.status(201).body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<PurchaseOrderResponseDTO>> deleteById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO setAvailable) {
        try {
            PurchaseOrderResponseDTO response = this.ordersService.cancelById(id, setAvailable);
            return ResponseEntity.status(200).body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }
}
