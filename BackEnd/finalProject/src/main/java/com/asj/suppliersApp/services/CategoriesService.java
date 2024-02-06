package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface CategoriesService {

    List<SmallCrudResponseDTO> findAll();
    SmallCrudResponseDTO findById(Integer id) throws ResourceNotFoundException;
    Boolean existsByName(SmallCrudRequestDTO request);
    SmallCrudResponseDTO createCategory(SmallCrudRequestDTO request) throws BadRequestException;
    SmallCrudResponseDTO updateCategory(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException, BadRequestException;
    SmallCrudResponseDTO CancelById(Integer id, CancelItemRequestDTO cancel) throws ResourceNotFoundException;

}
