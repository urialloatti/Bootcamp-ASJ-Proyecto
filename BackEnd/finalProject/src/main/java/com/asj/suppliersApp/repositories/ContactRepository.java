package com.asj.suppliersApp.repositories;

import com.asj.suppliersApp.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
