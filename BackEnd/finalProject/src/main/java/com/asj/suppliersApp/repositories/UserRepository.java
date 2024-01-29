package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsernameAndPasswordHash(String username, String passwordHash);
    boolean existsByUsername(String username);
}
