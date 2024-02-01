package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface CategoriesService {

    List<SmallCrudResponseDTO> findAll();
    Optional<SmallCrudResponseDTO> findById(Integer id);
    Boolean existsByName(SmallCrudRequestDTO request);
    Optional<SmallCrudResponseDTO> createCategory(SmallCrudRequestDTO request);
    SmallCrudResponseDTO updateCategory(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException;
    Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel);

}
