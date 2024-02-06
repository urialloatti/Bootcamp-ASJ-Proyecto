package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.exceptions.BadRequestException;
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
        for (Sector sector : sectors) {
            response.add(SmallCrudMapper.getSmallCrudDTO(sector));
        }
        return response;
    }

    @Override
    public SmallCrudResponseDTO findById(Integer id) throws ResourceNotFoundException {
        Sector sector = this.getSectorIfExists(id);
        return SmallCrudMapper.getSmallCrudDTO(sector);
    }

    @Override
    public Boolean existsByName(SmallCrudRequestDTO request) {
        return this.sectorRep.existsBySectorIgnoreCase(request.getName());
    }

    @Override
    public SmallCrudResponseDTO createSector(SmallCrudRequestDTO request) throws BadRequestException {
        if (this.existsByName(request)) {
            throw new BadRequestException("Ya existe un rubro con el nombre " + request.getName() + ".");
        }
        Sector sector = this.sectorRep.save(this.getSectorFromRequest(request));
        return SmallCrudMapper.getSmallCrudDTO(sector);
    }

    @Override
    public SmallCrudResponseDTO updateSector(Integer id, SmallCrudRequestDTO requestDTO) throws ResourceNotFoundException, BadRequestException {
        Sector sector = this.getSectorIfExists(id);
        if (this.existsByName(requestDTO)) {
            throw new BadRequestException("Ya existe un rubro con el nombre " + requestDTO.getName() + ".");
        }
        return SmallCrudMapper.getSmallCrudDTO(this.sectorRep.save(sector));
    }

    @Override
    public SmallCrudResponseDTO cancelById(Integer id, CancelItemRequestDTO cancel) throws ResourceNotFoundException {
        Sector sector = this.getSectorIfExists(id);
        sector.setAvailable(cancel.isAvailable());
        this.sectorRep.save(sector);
        return SmallCrudMapper.getSmallCrudDTO(sector);
    }

    private Sector getSectorIfExists(Integer id) throws ResourceNotFoundException {
        return this.sectorRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rubro con Id " + id + " no encontrado."));
    }

    private Sector getSectorFromRequest(SmallCrudRequestDTO request) {
        Sector sector = new Sector();
        sector.setSector(request.getName());
        sector.setAvailable(true);
        sector.setCreatedAt(new Date());
        return sector;
    }
}
