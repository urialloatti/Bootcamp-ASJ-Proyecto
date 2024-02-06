package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Integer> {
}
