package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface SectorsService {
    List<SmallCrudResponseDTO> findAll();
    Optional<SmallCrudResponseDTO> findById(Integer Id);
    Boolean existsByName(SmallCrudRequestDTO request);
    Optional<SmallCrudResponseDTO> createSector(SmallCrudRequestDTO request);
    SmallCrudResponseDTO updateSector(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException;
    Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel);




}
