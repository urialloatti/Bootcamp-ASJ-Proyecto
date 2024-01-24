package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.services.SectorsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/sectors")
public class SectorsController {
    private final SectorsService sectorsService;


    public SectorsController(SectorsService sectorsService) {
        this.sectorsService = sectorsService;
    }

    @GetMapping()
    public List<Sector> getAll(){
        return this.sectorsService.findAll();
    }

}
