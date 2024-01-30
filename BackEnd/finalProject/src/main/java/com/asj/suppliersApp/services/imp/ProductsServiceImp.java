package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.ProductRequestDTO;
import com.asj.suppliersApp.dto.response.ProductResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Product;
import com.asj.suppliersApp.entities.Supplier;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
import com.asj.suppliersApp.mappers.ProductMapper;
import com.asj.suppliersApp.repositories.CategoryRepository;
import com.asj.suppliersApp.repositories.ProductRepository;
import com.asj.suppliersApp.repositories.SupplierRepository;
import com.asj.suppliersApp.services.ProductsService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductsServiceImp implements ProductsService {
    private final ProductRepository productRep;
    private final SupplierRepository supplierRep;
    private final CategoryRepository categoryRep;

    public ProductsServiceImp(ProductRepository productRep, SupplierRepository supplierRep, CategoryRepository categoryRep) {
        this.productRep = productRep;
        this.supplierRep = supplierRep;
        this.categoryRep = categoryRep;
    }

    @Override
    public List<ProductResponseDTO> findAllAvailables() {
        List<Product> products = productRep.findByAvailableTrue();
        List<ProductResponseDTO> response = new ArrayList<>();
        for (Product product: products ) {
            response.add(ProductMapper.getProductResponse(product));
        }
        return  response;
    }

    @Override
    public List<ProductResponseDTO> findAllDeleted() {
        List<Product> products = productRep.findByAvailableFalse();
        List<ProductResponseDTO> response = new ArrayList<>();
        for (Product product: products ) {
            if (product.getsupplier().getAvailable()) {
            response.add(ProductMapper.getProductResponse(product));
            }
        }
        return  response;
    }

    @Override
    public List<ProductResponseDTO> findAllBySupplierId(Integer id) {
        List<Product> products = productRep.findByAvailableTrueAndSupplierId(id);
        List<ProductResponseDTO> response = new ArrayList<>();
        for (Product product: products ) {
            response.add(ProductMapper.getProductResponse(product));
        }
        return  response;
    }

    @Override
    public ProductResponseDTO findById(Integer id) throws ResourceNotFoundException {
        return ProductMapper.getProductResponse(this.getProductIfExists(id));

    }

    @Override
    public ProductRequestDTO findByIdUpdate(Integer id) throws ResourceNotFoundException {
        return ProductMapper.getRequestFromProduct(this.getProductIfExists(id));
    }

    @Override
    public ProductResponseDTO create(ProductRequestDTO request) throws ResourceNotFoundException {
        Supplier supplier = this.supplierRep.findById(request.getSupplierId())
                .orElseThrow(()-> new ResourceNotFoundException("Proveedor con el Id " + request.getSupplierId() + " no encontrado."));
        Category category = this.categoryRep.findById(request.getCategoryId())
                .orElseThrow(()-> new ResourceNotFoundException("Categoría con el Id " + request.getCategoryId() + " no encontrada."));
        Product product = ProductMapper.getProductFromRequest(request, supplier, category);
        product.setCode(UUID.randomUUID().toString().replaceAll("-", "").substring(0, 9));
        product.setAvailable(true);
        product.setCreatedAt(new Date());
        product.setUpdatedAt(new Date());
        product = this.productRep.save(product);
        return ProductMapper.getProductResponse(product);
    }

    @Override
    public ProductResponseDTO update(ProductRequestDTO request, Integer id) throws ResourceNotFoundException {
        Product product = this.getProductIfExists(id);
        Supplier supplier = this.supplierRep.findById(request.getSupplierId())
                .orElseThrow(()-> new ResourceNotFoundException("Proveedor con el Id " + request.getSupplierId() + " no encontrado."));
        Category category = this.categoryRep.findById(request.getCategoryId())
                .orElseThrow(()-> new ResourceNotFoundException("Categoría con el Id " + request.getCategoryId() + " no encontrada."));
        product = ProductMapper.getProductFromRequest(product, request, supplier, category);
        product.setUpdatedAt(new Date());
        product = this.productRep.save(product);
        return ProductMapper.getProductResponse(product);
    }

    @Override
    public ProductResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable)  throws ResourceNotFoundException  {
        Product product = this.getProductIfExists(id);
        product.setUpdatedAt(new Date());
        product.setAvailable(setAvailable.isAvailable());
        product = this.productRep.save(product);
        return ProductMapper.getProductResponse(product);
    }

    @Override
    public long countAvailables() {
        return this.productRep.countByAvailableTrue();
    }

    private Product getProductIfExists(Integer id)  throws ResourceNotFoundException {
        return this.productRep.findById(id).orElseThrow(()-> new ResourceNotFoundException("Producto con el Id " + id + " no encontrado."));
    }
}
