package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.CheckCuitRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.ApiResponse;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.BadRequestBodyChecker;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.services.SuppliersService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<ApiResponse<SupplierResponseDTO>> getById(@PathVariable Integer id) {
        try {
        SupplierResponseDTO response = suppliersService.findById(id);
        return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/u/{id}")
    public ResponseEntity<ApiResponse<SupplierRequestDTO>> getUpdateById(@PathVariable Integer id) {
        try {
        SupplierRequestDTO response = suppliersService.findByIdUpdate(id);
        return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.status(200).body(this.suppliersService.countAvailables());
    }

    @GetMapping("/deleted")
    public List<SupplierResponseDTO> getAllDeleted() {
        return  suppliersService.findAllDeleted();
    }
    @PatchMapping("/deleted/{id}")
    public ResponseEntity<ApiResponse<SupplierResponseDTO>> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO setAvailable) {
        try {
            SupplierResponseDTO response = suppliersService.cancelById(id, setAvailable);
            return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<SupplierResponseDTO>> postSupplier(@Valid @RequestBody SupplierRequestDTO requestDTO, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
        try {
        SupplierResponseDTO response = suppliersService.create(requestDTO);
        return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SupplierResponseDTO>> updateSupplier(@PathVariable Integer id, @Valid @RequestBody SupplierRequestDTO requestDTO, BindingResult bindingResult) {
        try {
            BadRequestBodyChecker.checkBody(bindingResult);
        } catch (BadRequestException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(400).body(new ApiResponse<>(e.getMessage()));
        }
        try {
            SupplierResponseDTO response = suppliersService.update(requestDTO, id);
            return ResponseEntity.ok().body(new ApiResponse<>(response));
        } catch (ResourceNotFoundException e) {
            System.out.println(e.toString());
            return ResponseEntity.status(404).body(new ApiResponse<>(e.getMessage()));
        }
    }

    @PatchMapping("/check-cuit")
    public ResponseEntity<Boolean> checkCuit(@RequestBody CheckCuitRequestDTO requestDTO) {
        return ResponseEntity.ok().body(this.suppliersService.checkCuitExists(requestDTO.getCuit()));
    }
}
