package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.services.SectorsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/sectors")
public class SectorsController {
    private final SectorsService sectorsService;


    public SectorsController(SectorsService sectorsService) {
        this.sectorsService = sectorsService;
    }

    @GetMapping()
    public ResponseEntity<List<SmallCrudResponseDTO>> getAll(){
        return ResponseEntity.ok().body(this.sectorsService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> getById(@PathVariable Integer id) {
        Optional<SmallCrudResponseDTO> response = sectorsService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>("Rubro con id " + id + " no encontrado."));
        }
        return ResponseEntity.ok().body(new ApiResponse<>(response.get()));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> postSector(@RequestBody SmallCrudRequestDTO request) {
        Optional<SmallCrudResponseDTO> response = this.sectorsService.createSector(request);
        if (response.isEmpty()) {
            return ResponseEntity.status(400).body(new ApiResponse<>("Error al crearlo."));
        }
        return ResponseEntity.ok().body(new ApiResponse<>(response.get()));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<SmallCrudResponseDTO>> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancelRequest) {
        Optional<SmallCrudResponseDTO> response = this.sectorsService.CancelById(id, cancelRequest);
        if (response.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>("Rubro con id " + id + " no encontrado."));
        }
        return ResponseEntity.ok().body(new ApiResponse<>(response.get()));
    }

}
