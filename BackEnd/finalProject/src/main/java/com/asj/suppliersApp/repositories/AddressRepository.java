package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}
