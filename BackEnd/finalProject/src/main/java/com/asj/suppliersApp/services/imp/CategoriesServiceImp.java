package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.mappers.SmallCrudMapper;
import com.asj.suppliersApp.repositories.CategoryRepository;
import com.asj.suppliersApp.services.CategoriesService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class CategoriesServiceImp implements CategoriesService {
    private final CategoryRepository categoryRep;

    public CategoriesServiceImp(CategoryRepository categoryRep) {
        this.categoryRep = categoryRep;
    }

    @Override
    public List<SmallCrudResponseDTO> findAll() {
        List<Category> categories = this.categoryRep.findByAvailableTrue();
        List<SmallCrudResponseDTO> response = new ArrayList<SmallCrudResponseDTO>();
        for(Category category: categories) {
            response.add(SmallCrudMapper.getSmallCrudDTO(category));
        }
        return response;
    }

    @Override
    public Optional<SmallCrudResponseDTO> findById(Integer id) {
        Optional<Category> optCategory = this.categoryRep.findById(id);
        if (optCategory.isEmpty()) {
        return Optional.empty();
        }
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(optCategory.get()));
    }

    @Override
    public Boolean existsByName(SmallCrudRequestDTO request) {
        return this.categoryRep.existsByCategoryIgnoreCase(request.getName());
    }

    @Override
    public Optional<SmallCrudResponseDTO> createCategory(SmallCrudRequestDTO request) {
        Category category = this.categoryRep.save(this.getSectorFromRequest(request));
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(category));
    }

    @Override
    public SmallCrudResponseDTO updateCategory(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException {
        Category category = this.getCategoryIfExists(id);
        category.setCategory(requestDTO.getName());
        return SmallCrudMapper.getSmallCrudDTO(this.categoryRep.save(category));
    }

    @Override
    public Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel) {
        Optional<Category> optCategory = this.categoryRep.findById(id);
        if (optCategory.isEmpty()) {
            return Optional.empty();
        }
        Category category = optCategory.get();
        category.setAvailable(cancel.isAvailable());
        this.categoryRep.save(category);
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(category));
    }

    private Category getSectorFromRequest(SmallCrudRequestDTO request) {
        Category category = new Category();
        category.setCategory(request.getName());
        category.setAvailable(true);
        category.setCreatedAt(new Date());
        return category;
    }

    private Category getCategoryIfExists(Integer id) throws ResourceNotFoundException {
        return this.categoryRep.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Categoría con Id " + id + " no encontrada."));
    }
}
