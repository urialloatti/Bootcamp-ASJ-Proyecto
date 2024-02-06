package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.exceptions.BadRequestException;
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
        for (Category category : categories) {
            response.add(SmallCrudMapper.getSmallCrudDTO(category));
        }
        return response;
    }

    @Override
    public SmallCrudResponseDTO findById(Integer id) throws ResourceNotFoundException {
        Category category = this.getCategoryIfExists(id);
        return SmallCrudMapper.getSmallCrudDTO(category);
    }

    @Override
    public Boolean existsByName(SmallCrudRequestDTO request) {
        return this.categoryRep.existsByCategoryIgnoreCase(request.getName());
    }

    @Override
    public SmallCrudResponseDTO createCategory(SmallCrudRequestDTO request) throws BadRequestException {
        if (this.categoryRep.existsByCategoryIgnoreCase(request.getName())) {
            throw new BadRequestException("Ya existe una categoría con el nombre " + request.getName() + ".");
        }
        Category category = this.categoryRep.save(this.getSectorFromRequest(request));
        return SmallCrudMapper.getSmallCrudDTO(category);
    }

    @Override
    public SmallCrudResponseDTO updateCategory(Integer id, SmallCrudRequestDTO request) throws ResourceNotFoundException, BadRequestException {
        Category category = this.getCategoryIfExists(id);
        if (this.categoryRep.existsByCategoryIgnoreCase(request.getName())) {
            throw new BadRequestException("Ya existe una categoría con el nombre " + request.getName() + ".");
        }
        category.setCategory(request.getName());
        return SmallCrudMapper.getSmallCrudDTO(this.categoryRep.save(category));
    }

    @Override
    public SmallCrudResponseDTO CancelById(Integer id, CancelItemRequestDTO cancel) throws ResourceNotFoundException {
        Category category = this.getCategoryIfExists(id);
        category.setAvailable(cancel.isAvailable());
        return SmallCrudMapper.getSmallCrudDTO(this.categoryRep.save(category));
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
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con Id " + id + " no encontrada."));
    }
}
