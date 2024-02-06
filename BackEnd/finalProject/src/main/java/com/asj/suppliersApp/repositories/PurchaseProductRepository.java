package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.PurchaseProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Integer> {
}
