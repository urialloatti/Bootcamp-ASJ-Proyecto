package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.services.CategoriesService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
    public ResponseEntity<SmallCrudResponseDTO> getById(@PathVariable Integer id) {
        Optional<SmallCrudResponseDTO> response = categoriesService.findById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PostMapping()
    public ResponseEntity<SmallCrudResponseDTO> postSector(@RequestBody SmallCrudRequestDTO request) {
        Optional<SmallCrudResponseDTO> response = this.categoriesService.createSector(request);
        if (response.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<SmallCrudResponseDTO>(response.get(), HttpStatusCode.valueOf(201) );
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<SmallCrudResponseDTO> cancelById(@PathVariable Integer id, @RequestBody CancelItemRequestDTO cancelRequest) {
        Optional<SmallCrudResponseDTO> response = this.categoriesService.CancelById(id, cancelRequest);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

}
