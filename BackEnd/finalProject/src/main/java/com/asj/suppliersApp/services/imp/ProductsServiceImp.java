package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Product;
import com.asj.suppliersApp.entities.Supplier;
import com.asj.suppliersApp.mappers.ProductMapper;
import com.asj.suppliersApp.repositories.CategoryRepository;
import com.asj.suppliersApp.repositories.ProductRepository;
import com.asj.suppliersApp.repositories.SupplierRepository;
import com.asj.suppliersApp.services.ProductsService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductsServiceImp implements ProductsService {
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;

    public ProductsServiceImp(ProductRepository productRepository, SupplierRepository supplierRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<ProductResponseDTO> findAllAvailables() {
        List<Product> products = productRepository.findByAvailableTrue();
        List<ProductResponseDTO> response = new ArrayList<>();
        for (Product product: products ) {
            response.add(ProductMapper.getProductResponse(product));
        }
        return  response;
    }

    @Override
    public List<ProductResponseDTO> findAllBySupplierId(Integer id) {
        List<Product> products = productRepository.findByAvailableTrueAndSupplierId(id);
        List<ProductResponseDTO> response = new ArrayList<>();
        for (Product product: products ) {
            response.add(ProductMapper.getProductResponse(product));
        }
        return  response;
    }

    @Override
    public Optional<ProductResponseDTO> findById(Integer id) {
        Optional<Product> optProduct = this.productRepository.findById(id);
        if (optProduct.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(ProductMapper.getProductResponse(optProduct.get()));

    }

    @Override
    public Optional<ProductRequestDTO> findByIdUpdate(Integer id) {
        Optional<Product> optProduct = this.productRepository.findById(id);
        if (optProduct.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(ProductMapper.getRequestFromProduct(optProduct.get()));
    }

    @Override
    public Optional<ProductResponseDTO> create(ProductRequestDTO request) {
        Optional<Supplier> optSupplier = this.supplierRepository.findById(request.getSupplierId());
        Optional<Category> optCategory = this.categoryRepository.findById(request.getCategoryId());
        if (optSupplier.isEmpty() || optCategory.isEmpty()) {
        return Optional.empty();
        }
        Product product = ProductMapper.getProductFromRequest(request, optSupplier.get(), optCategory.get());
        product.setCode(UUID.randomUUID().toString());
        product.setAvailable(true);
        product.setCreatedAt(new Date());
        product.setUpdatedAt(new Date());
        product = this.productRepository.save(product);
        return Optional.of(ProductMapper.getProductResponse(product));
    }

    @Override
    public Optional<ProductResponseDTO> update(ProductRequestDTO request, Integer id) {
        Optional<Product> optProduct = this.productRepository.findById(id);
        if (optProduct.isEmpty()){
            return Optional.empty();
        }
        Optional<Supplier> optSupplier = this.supplierRepository.findById(request.getSupplierId());
        Optional<Category> optCategory = this.categoryRepository.findById(request.getCategoryId());
        if (optSupplier.isEmpty() || optCategory.isEmpty()) {
            return Optional.empty();
        }
        Product product = ProductMapper.getProductFromRequest(optProduct.get(), request, optSupplier.get(), optCategory.get());
        product.setUpdatedAt(new Date());
        product = this.productRepository.save(product);
        return Optional.of(ProductMapper.getProductResponse(product));
    }

    @Override
    public Optional<ProductResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable) {
        Optional<Product> optProduct = this.productRepository.findById(id);
        if (optProduct.isEmpty()){
            return Optional.empty();
        }
        Product product = optProduct.get();
        product.setUpdatedAt(new Date());
        product.setAvailable(setAvailable.isAvailable());
        product = this.productRepository.save(product);
        return Optional.of(ProductMapper.getProductResponse(product));
    }

}
