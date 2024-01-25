package com.asj.suppliersApp.controllers;

import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.services.FiscalConditionsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/fiscal-conditions")
public class FiscalConditionController {

    private final FiscalConditionsService fiscalConditionsService;

    public FiscalConditionController(FiscalConditionsService fiscalConditionsService) {
        this.fiscalConditionsService = fiscalConditionsService;
    }

    @GetMapping()
    public List<SmallCrudResponseDTO> getAll() {
        return fiscalConditionsService.findAll();
    }
}
