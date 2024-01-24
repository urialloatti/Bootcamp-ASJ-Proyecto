package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
}
