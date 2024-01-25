package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;

import java.util.List;
import java.util.Optional;

public interface SectorsService {
    List<SmallCrudResponseDTO> findAll();
    Optional<SmallCrudResponseDTO> findById(Integer Id);
    Optional<SmallCrudResponseDTO> createSector(SmallCrudRequestDTO request);
    Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel);




}
