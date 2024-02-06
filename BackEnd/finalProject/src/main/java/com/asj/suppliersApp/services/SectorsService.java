package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface SectorsService {
    List<SmallCrudResponseDTO> findAll();
    SmallCrudResponseDTO findById(Integer Id) throws ResourceNotFoundException;
    Boolean existsByName(SmallCrudRequestDTO request);
    SmallCrudResponseDTO createSector(SmallCrudRequestDTO request) throws BadRequestException;
    SmallCrudResponseDTO updateSector(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException, BadRequestException;
    SmallCrudResponseDTO cancelById(Integer id, CancelItemRequestDTO cancel) throws ResourceNotFoundException;




}
