package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.entities.FiscalCondition;
import com.asj.suppliersApp.entities.Province;
import com.asj.suppliersApp.entities.Sector;
import com.asj.suppliersApp.entities.Supplier;
import com.asj.suppliersApp.mappers.SupplierMapper;
import com.asj.suppliersApp.repositories.*;
import org.springframework.stereotype.Service;

import com.asj.suppliersApp.services.SuppliersService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SuppliersServiceImp implements SuppliersService {

    private final SupplierRepository supplierRep;
    private final SectorRepository sectorRep;
    private final FiscalConditionRepository fiscalCondRep;
    private final PhoneReposiroty phoneRep;
    private final AddressRepository addressRep;
    private final ContactRepository contactRep;
    private final ProvinceRepository provinceRep;

    public SuppliersServiceImp(SupplierRepository supplierRep, SectorRepository sectorRep, FiscalConditionRepository fiscalCondRep, PhoneReposiroty phoneRep, AddressRepository addressRep, ContactRepository contactRep, ProvinceRepository provinceRep) {
        this.supplierRep = supplierRep;
        this.sectorRep = sectorRep;
        this.fiscalCondRep = fiscalCondRep;
        this.phoneRep = phoneRep;
        this.addressRep = addressRep;
        this.contactRep = contactRep;
        this.provinceRep = provinceRep;
    }

    @Override
    public List<SupplierResponseDTO> findAllAvailables() {
        List<Supplier> supplierList = this.supplierRep.findByAvailableTrue();
        List<SupplierResponseDTO> response = new ArrayList<SupplierResponseDTO>();
        for (Supplier supplier : supplierList) {
            response.add(SupplierMapper.getSupplierResponseDTO(supplier));
        }
        return response;
    }

    @Override
    public Optional<SupplierResponseDTO> findById(Integer id) {
        Optional<Supplier> supplier = this.supplierRep.findById(id);
        if (supplier.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(SupplierMapper.getSupplierResponseDTO(supplier.get()));
    }

    @Override
    public Optional<SupplierRequestDTO> findByIdUpdate(Integer id) {
        Optional<Supplier> supplier = this.supplierRep.findById(id);
        if (supplier.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(SupplierMapper.getRequestDTO(supplier.get()));
    }

    @Override
    public Optional<SupplierResponseDTO> create(SupplierRequestDTO request) {
        Optional<Supplier> optSupplier = this.getNewSupplier(request);
        if (optSupplier.isEmpty()) {
            return Optional.empty();
        }
        Supplier supplier = optSupplier.get();
        supplier.setAvailable(true);
        supplier.setCreatedAt(new Date());
        supplier.setUpdatedAt(new Date());
        supplier = supplierRep.save(supplier);
        supplier.setCode(this.getSupplierCode(supplier));
        supplier = supplierRep.save(supplier);

        return Optional.of(SupplierMapper.getSupplierResponseDTO(supplier));
    }

    @Override
    public Optional<SupplierResponseDTO> update(SupplierRequestDTO request, Integer id) {
        Optional<Supplier> optSupplier = this.supplierRep.findById(id);
        optSupplier = this.updateSupplier(optSupplier, request);
        if (optSupplier.isEmpty()) {
        return Optional.empty();
        }
        SupplierResponseDTO response = SupplierMapper.getSupplierResponseDTO(this.supplierRep.save(optSupplier.get()));
        return Optional.of(response);
    }

    @Override
    public Optional<SupplierResponseDTO> cancelById(Integer id, CancelItemRequestDTO setAvailable) {
        Optional<Supplier> OpToDelete = this.supplierRep.findById(id);
        if (OpToDelete.isEmpty()) {
            return Optional.empty();
        }
        Supplier toDelete = OpToDelete.get();
        toDelete.setAvailable(setAvailable.isAvailable());
        toDelete.setUpdatedAt(new Date());
        this.supplierRep.save(toDelete);
        return Optional.of(SupplierMapper.getSupplierResponseDTO(toDelete));
    }

    @Override
    public boolean checkCuitExists(String cuit) {
        return this.supplierRep.existsByCuit(cuit);
    }

    private Optional<Supplier> updateSupplier(Optional<Supplier> optSupplier, SupplierRequestDTO requestDTO) {
        if (optSupplier.isEmpty()) {
            return optSupplier;
        }
        Supplier supplier = optSupplier.get();
        supplier = SupplierMapper.updateSupplierFromRequest(supplier, requestDTO);
        Optional<Sector> sector = this.sectorRep.findById(requestDTO.getSectorId());
        Optional<FiscalCondition> fiscalCondition = this.fiscalCondRep.findById(requestDTO.getFiscalConditionId());
        Optional<Province> province = this.provinceRep.findById(requestDTO.getFullAddress().getProvinceId());
        if (sector.isEmpty() || province.isEmpty() || fiscalCondition.isEmpty()) {
            return Optional.empty();
        }
        supplier.setSector(sector.get());
        supplier.setAddress(SupplierMapper.updateAddress(supplier.getAddress(), requestDTO.getFullAddress(), province.get()));
        supplier.setFiscalCondition(fiscalCondition.get());
        supplier.setCode(this.getSupplierCode(supplier));
        supplier.setUpdatedAt(new Date());
        return Optional.of(supplier);
    }
    private Optional<Supplier> getNewSupplier(SupplierRequestDTO requestDTO) {
        Supplier supplier = SupplierMapper.getSupplierFromRequest(requestDTO);
        Optional<Sector> sector = this.sectorRep.findById(requestDTO.getSectorId());
        Optional<FiscalCondition> fiscalCondition = this.fiscalCondRep.findById(requestDTO.getFiscalConditionId());
        Optional<Province> province = this.provinceRep.findById(requestDTO.getFullAddress().getProvinceId());
        if (sector.isEmpty() || province.isEmpty() || fiscalCondition.isEmpty()) {
            return Optional.empty();
        }
        supplier.setSector(sector.get());
        supplier.setAddress(SupplierMapper.getAddress(requestDTO.getFullAddress(), province.get()));
        supplier.setAddress(supplier.getAddress());
        supplier.setFiscalCondition(fiscalCondition.get());
        supplier.setPhone(supplier.getPhone());
        supplier.getContact().setPhone(supplier.getContact().getPhone());
        supplier.setContact(supplier.getContact());
        supplier.setCode("");
        return Optional.of(supplier);

    }

    private String getSupplierCode(Supplier supplier) {
        return supplier.getSector().getSector().substring(0,3) + supplier.getId();
    }


}
