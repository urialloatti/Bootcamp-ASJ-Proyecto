package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;

import java.util.List;

public interface FiscalConditionsService {

    List<SmallCrudResponseDTO> findAll();
}
