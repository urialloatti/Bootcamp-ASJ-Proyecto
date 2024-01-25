package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.CheckCuitRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.services.SuppliersService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
        return  suppliersService.findAllAvailables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> getById(@PathVariable Integer id) {
        Optional<SupplierResponseDTO> response = suppliersService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @GetMapping("u/{id}")
    public ResponseEntity<SupplierRequestDTO> getUpdateById(@PathVariable Integer id) {
        Optional<SupplierRequestDTO> response = suppliersService.findByIdUpdate(id);
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
    public ResponseEntity<SupplierResponseDTO> postSupplier(@Valid @RequestBody SupplierRequestDTO requestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (FieldError error: bindingResult.getFieldErrors()) {
                System.out.println(error.toString());
            }
        }
        Optional<SupplierResponseDTO> response = suppliersService.create(requestDTO);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> updateSupplier(@PathVariable Integer id, @Valid @RequestBody SupplierRequestDTO requestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (FieldError error: bindingResult.getFieldErrors()) {
                System.out.println(error.toString());
            }
        }
        Optional<SupplierResponseDTO> response = suppliersService.update(requestDTO, id);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PatchMapping("/check-cuit")
    public ResponseEntity<Boolean> checkCuit(@RequestBody CheckCuitRequestDTO requestDTO) {
        return ResponseEntity.ok().body(this.suppliersService.checkCuitExists(requestDTO.getCuit()));
    }
}
