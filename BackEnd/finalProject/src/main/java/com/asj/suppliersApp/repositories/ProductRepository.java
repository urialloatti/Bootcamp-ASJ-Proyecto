package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
