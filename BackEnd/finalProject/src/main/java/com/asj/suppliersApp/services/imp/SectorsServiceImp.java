package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
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
    private final SectorRepository sectorRep;

    public SectorsServiceImp(SectorRepository sectorRep) {
        this.sectorRep = sectorRep;
    }

    @Override
    public List<SmallCrudResponseDTO> findAll() {
        List<Sector> sectors = this.sectorRep.findByAvailableTrue();
        List<SmallCrudResponseDTO> response = new ArrayList<SmallCrudResponseDTO>();
        for (Sector sector: sectors) {
            response.add(SmallCrudMapper.getSmallCrudDTO(sector));
        }
        return response;
    }

    @Override
    public Optional<SmallCrudResponseDTO> findById(Integer id) {
        Optional<Sector> optSector = this.sectorRep.findById(id);
        if (optSector.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(optSector.get()));
    }

    @Override
    public Boolean existsByName(SmallCrudRequestDTO request) {
        return this.sectorRep.existsBySectorIgnoreCase(request.getName());
    }

    @Override
    public Optional<SmallCrudResponseDTO> createSector(SmallCrudRequestDTO request) {
        Sector sector = this.sectorRep.save(this.getSectorFromRequest(request));
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(sector));
    }

    @Override
    public SmallCrudResponseDTO updateSector(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException {
        Sector sector = this.getSectorIfExists(id);
        return SmallCrudMapper.getSmallCrudDTO(this.sectorRep.save(sector));
    }

    @Override
    public Optional<SmallCrudResponseDTO> CancelById(Integer id, CancelItemRequestDTO cancel) {
        Optional<Sector> optSector = this.sectorRep.findById(id);
        if (optSector.isEmpty()) {
            return Optional.empty();
        }
        Sector sector = optSector.get();
        sector.setAvailable(cancel.isAvailable());
        this.sectorRep.save(sector);
        return Optional.of(SmallCrudMapper.getSmallCrudDTO(sector));
    }

    private Sector getSectorIfExists(Integer id)  throws ResourceNotFoundException {
        return this.sectorRep.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Rubro con Id " + id + " no encontrado."));
    }

    private Sector getSectorFromRequest(SmallCrudRequestDTO request) {
        Sector sector = new Sector();
        sector.setSector(request.getName());
        sector.setAvailable(true);
        sector.setCreatedAt(new Date());
        return sector;
    }
}
