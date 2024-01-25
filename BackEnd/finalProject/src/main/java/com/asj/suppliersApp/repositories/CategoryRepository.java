package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository <Category, Integer> {

    List<Category> findByAvailableTrue();
}
