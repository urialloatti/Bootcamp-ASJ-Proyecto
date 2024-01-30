package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;

import java.util.List;
import java.util.Optional;

public interface CategoriesService {

    List<SmallCrudResponseDTO> findAll();
    Optional<SmallCrudResponseDTO> findById(Integer id);
    Optional<SmallCrudResponseDTO> createSector(SmallCrudRequestDTO request);
    Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel);

}
