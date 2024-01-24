package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.repositories.SectorRepository;
import com.asj.suppliersApp.services.SectorsService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SectorsServiceImp implements SectorsService {
    private final SectorRepository sectorRepository;

    public SectorsServiceImp(SectorRepository sectorRepository) {
        this.sectorRepository = sectorRepository;
    }

    @Override
    public List<Sector> findAll() {
        return this.sectorRepository.findAll();
    }

    @Override
    public Sector findById(Integer Id) {
        return null;
    }
}
