package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository <Category, Integer> {
}
