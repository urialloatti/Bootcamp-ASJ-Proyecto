package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Phone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneReposiroty extends JpaRepository<Phone, Integer> {
}
