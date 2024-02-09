package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestBodyChecker;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.services.ProductsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/products")
public class ProductsController {
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping()
    public ResponseEntity<List<ProductResponseDTO>> getList() {
        return ResponseEntity.ok().body(this.productsService.findAllAvailables());
    }

    @GetMapping("/supplier/{id}")
    public ResponseEntity<List<ProductResponseDTO>> getList(@PathVariable Integer id) {
        return ResponseEntity.ok().body(this.productsService.findAllBySupplierId(id));
    }

    @GetMapping("/deleted")
    public ResponseEntity<List<ProductResponseDTO>> getAllDeleted() {
        return ResponseEntity.ok().body(this.productsService.findAllDeleted());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> getProductById(@PathVariable Integer id) {
        try {
            ProductResponseDTO response = this.productsService.findById(id);
            return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/u/{id}")
    public ResponseEntity<ApiResponse<ProductRequestDTO>> getProductForUpdate(@PathVariable Integer id) {
        try {
            ProductRequestDTO request = this.productsService.findByIdUpdate(id);
            return ResponseEntity.ok().body(new ApiResponse<>(request));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.status(200).body(this.productsService.countAvailables());
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<ProductResponseDTO>> postNewProduct(@Valid @RequestBody ProductRequestDTO product, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
            ProductResponseDTO response = this.productsService.create(product);
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
    public ResponseEntity<ApiResponse<ProductResponseDTO>> updateProduct(@PathVariable Integer id, @Valid @RequestBody ProductRequestDTO product, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
            ProductResponseDTO response = this.productsService.update(product, id);
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
    public ResponseEntity<ApiResponse<ProductResponseDTO>> cancelProductById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancel) {
        try {
            ProductResponseDTO response = this.productsService.cancelById(id, cancel);
            return ResponseEntity.status(200).body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }
}
