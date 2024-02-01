package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.services.CategoriesService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<SmallCrudResponseDTO>> getAll(){
        return ResponseEntity.ok().body(this.categoriesService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> getById(@PathVariable Integer id) {
        Optional<SmallCrudResponseDTO> response = categoriesService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>("No se encontró la categoría con el id " + id));
        }
        return ResponseEntity.ok().body(new ApiResponse<>(response.get()));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> postSector(@RequestBody SmallCrudRequestDTO request) {
        Optional<SmallCrudResponseDTO> response = this.categoriesService.createCategory(request);
        if (response.isEmpty()) {
            return ResponseEntity.status(400).body(new ApiResponse<>("Error de mensaje."));
        }
        ApiResponse<SmallCrudResponseDTO> apiResponse = new ApiResponse<>(response.get());
        return ResponseEntity.status(201).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> updateCategory(@PathVariable Integer id, @RequestBody SmallCrudRequestDTO request) {
        try {
            SmallCrudResponseDTO response = this.categoriesService.updateCategory(id, request);
            return ResponseEntity.status(201).body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancelRequest) {
        Optional<SmallCrudResponseDTO> response = this.categoriesService.CancelById(id, cancelRequest);
        if (response.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>("No se encontró la categoría con el id " + id));
        }
        ApiResponse<SmallCrudResponseDTO> apiResponse = new ApiResponse<>("Categoria con id " + id + " eliminada correctamente.",response.get());
        return ResponseEntity.ok().body(apiResponse);
    }

    @PatchMapping("/exitst-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestBody SmallCrudRequestDTO requestDTO) {
        return ResponseEntity.status(200).body(this.categoriesService.existsByName(requestDTO));
    }

}
