package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByAvailableTrue();
    List<Product> findByAvailableTrueAndSupplierId(Integer supplierId);
    List<Product> findBySupplierId(Integer supplierId);
    List<Product> findByAvailableTrueAndCategoryId(Integer categoryId);
}
