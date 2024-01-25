package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.response.LocationResponseDTO;
import com.asj.suppliersApp.services.LocationsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/locations")
public class LocationsController {
    private final LocationsService locationsService;

    public LocationsController(LocationsService locationsService) {
        this.locationsService = locationsService;
    }

    @GetMapping()
    public ResponseEntity<List<LocationResponseDTO>> getList() {
        return ResponseEntity.ok().body(this.locationsService.getList());
    }

    @GetMapping("/country-id/{id}")
    public ResponseEntity<Integer> getCountryFromProvinceId(@PathVariable Integer id) {
        Integer countryId = this.locationsService.findCountryId(id);
        if (countryId == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(countryId);
    }
}
