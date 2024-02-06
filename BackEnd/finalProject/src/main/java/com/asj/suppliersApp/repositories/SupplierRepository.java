package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    List<Supplier> findByAvailableTrue();
    List<Supplier> findByAvailableFalse();
    boolean existsByCuit(String cuit);
    long countByAvailableTrue();
}
