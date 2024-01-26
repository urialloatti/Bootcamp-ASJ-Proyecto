package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.services.ProductsService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Integer id) {
        Optional<ProductResponseDTO> response = this.productsService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }
    @GetMapping("/u/{id}")
    public ResponseEntity<ProductRequestDTO> getProductForUpdateById(@PathVariable Integer id) {
        Optional<ProductRequestDTO> optRequest = this.productsService.findByIdUpdate(id);
        if (optRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(optRequest.get());
    }

    @PostMapping()
    public ResponseEntity<ProductResponseDTO> postNewProduct(@RequestBody ProductRequestDTO product) {
        Optional<ProductResponseDTO> response = this.productsService.create(product);
        if (response.isEmpty()) {
            return  ResponseEntity.badRequest().build();
        }
        return  new ResponseEntity<>(response.get(), HttpStatusCode.valueOf(201));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Integer id, @RequestBody ProductRequestDTO product) {
        Optional<ProductResponseDTO> response = this.productsService.update(product, id);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(response.get(), HttpStatusCode.valueOf(201));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<ProductResponseDTO> cancelProductById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancel) {
        Optional<ProductResponseDTO> response = this.productsService.cancelById(id, cancel);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }
}
