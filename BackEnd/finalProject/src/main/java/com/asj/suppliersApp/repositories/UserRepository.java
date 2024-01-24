package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
