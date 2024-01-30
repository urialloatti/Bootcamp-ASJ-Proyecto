package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.mappers.SmallCrudMapper;
import com.asj.suppliersApp.repositories.SectorRepository;
import com.asj.suppliersApp.services.SectorsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SectorsServiceImp implements SectorsService {
    private final SectorRepository sectorRepository;

    public SectorsServiceImp(SectorRepository sectorRepository) {
        this.sectorRepository = sectorRepository;
    }

    @Override
    public List<SmallCrudResponseDTO> findAll() {
        List<Sector> sectors = this.sectorRepository.findByAvailableTrue();
        List<SmallCrudResponseDTO> response = new ArrayList<SmallCrudResponseDTO>();
        for (Sector sector: sectors) {
            response.add(SmallCrudMapper.getSmallCrudDTO(sector));
        }
        return response;
    }

    @Override
    public Optional<SmallCrudResponseDTO> findById(Integer id) {
        Optional<Sector> optSector = this.sectorRepository.findById(id);
        if (optSector.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(optSector.get()));
    }

    @Override
    public Optional<SmallCrudResponseDTO> createSector(SmallCrudRequestDTO request) {
        Sector sector = this.sectorRepository.save(this.getSectorFromRequest(request));
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(sector));
    }

    @Override
    public Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel) {
        Optional<Sector> optSector = this.sectorRepository.findById(id);
        if (optSector.isEmpty()) {
            return Optional.empty();
        }
        Sector sector = optSector.get();
        sector.setAvailable(cancel.isAvailable());
        this.sectorRepository.save(sector);
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(sector));
    }

    private Sector getSectorFromRequest(SmallCrudRequestDTO request) {
        Sector sector = new Sector();
        sector.setSector(request.getName());
        sector.setAvailable(true);
        sector.setCreatedAt(new Date());
        return sector;
    }
}
