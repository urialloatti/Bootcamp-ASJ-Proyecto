package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.services.SuppliersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/app/suppliers")
public class SuppliersController {

    private final SuppliersService suppliersService;

    public SuppliersController(SuppliersService suppliersService) {
        this.suppliersService = suppliersService;
    }

    @GetMapping()
    public List<SupplierResponseDTO> getAll() {
        return  suppliersService.findAvailables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> getById(@PathVariable Integer id) {
        Optional<SupplierResponseDTO> response = suppliersService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<SupplierResponseDTO> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO setAvailable) {
        Optional<SupplierResponseDTO> response = suppliersService.cancelById(id, setAvailable);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PostMapping()
    public ResponseEntity<SupplierResponseDTO> postSupplier(@RequestBody SupplierRequestDTO requestDTO) {
        Optional<SupplierResponseDTO> response = suppliersService.create(requestDTO);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(response.get());
    }
}
