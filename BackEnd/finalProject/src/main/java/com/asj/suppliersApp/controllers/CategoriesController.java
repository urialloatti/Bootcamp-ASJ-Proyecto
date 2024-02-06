package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestBodyChecker;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.services.CategoriesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/categories")
public class CategoriesController {

    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    @GetMapping()
    public ResponseEntity<List<SmallCrudResponseDTO>> getAll() {
        return ResponseEntity.ok().body(this.categoriesService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> getById(@PathVariable Integer id) {
        try {
            SmallCrudResponseDTO response = categoriesService.findById(id);
            return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> postSector(@Valid @RequestBody SmallCrudRequestDTO request, BindingResult bindingResult) {
        try {
            SmallCrudResponseDTO response = this.categoriesService.createCategory(request);
            return ResponseEntity.status(201).body(new ApiResponse<>(response));
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> updateCategory(@PathVariable Integer id, @Valid @RequestBody SmallCrudRequestDTO request, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
            SmallCrudResponseDTO response = this.categoriesService.updateCategory(id, request);
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
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancelRequest) {
        try {
            SmallCrudResponseDTO response = this.categoriesService.CancelById(id, cancelRequest);
            return ResponseEntity.ok().body(new ApiResponse<>("Categoria " + response.getName() + " eliminada correctamente.", response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PatchMapping("/exitst-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestBody SmallCrudRequestDTO requestDTO) {
        return ResponseEntity.status(200).body(this.categoriesService.existsByName(requestDTO));
    }

}
