package com.asj.suppliersApp.services;

import com.asj.suppliersApp.entities.Sector;

import java.util.List;

public interface SectorsService {
    List<Sector> findAll();
    Sector findById(Integer Id);
}
