package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer> {
    List<PurchaseOrder> findByAvailableTrue();
    long countByAvailableTrue();
}
