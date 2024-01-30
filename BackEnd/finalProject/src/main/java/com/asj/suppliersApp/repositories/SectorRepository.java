package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
    List<Sector> findByAvailableTrue();
}
