package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.CancelItemRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.entities.*;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
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
    private final ProvinceRepository provinceRep;
    private final ProductRepository productRep;

    public SuppliersServiceImp(SupplierRepository supplierRep, SectorRepository sectorRep, FiscalConditionRepository fiscalCondRep, ProvinceRepository provinceRep, ProductRepository productRep) {
        this.supplierRep = supplierRep;
        this.sectorRep = sectorRep;
        this.fiscalCondRep = fiscalCondRep;
        this.provinceRep = provinceRep;
        this.productRep = productRep;
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
    public List<SupplierResponseDTO> findAllDeleted() {
        List<Supplier> supplierList = this.supplierRep.findByAvailableFalse();
        List<SupplierResponseDTO> response = new ArrayList<SupplierResponseDTO>();
        for (Supplier supplier : supplierList) {
            response.add(SupplierMapper.getSupplierResponseDTO(supplier));
        }
        return response;
    }

    @Override
    public SupplierResponseDTO findById(Integer id) throws ResourceNotFoundException {
        return SupplierMapper.getSupplierResponseDTO(this.getSupplierIfExists(id));
    }

    @Override
    public SupplierRequestDTO findByIdUpdate(Integer id) throws ResourceNotFoundException {
        return SupplierMapper.getRequestDTO(this.getSupplierIfExists(id));
    }

    @Override
    public SupplierResponseDTO create(SupplierRequestDTO request) throws ResourceNotFoundException, BadRequestException {
        if (this.checkCuitExists(request.getCuit())) {
            throw new BadRequestException("Ya existe un proveedor con el cuit " + request.getCuit() + ".");
        }
        Supplier supplier = this.getNewSupplier(request);
        supplier.setAvailable(true);
        supplier.setCreatedAt(new Date());
        supplier.setUpdatedAt(new Date());
        supplier = supplierRep.save(supplier);
        supplier.setCode(this.getSupplierCode(supplier));
        supplier = supplierRep.save(supplier);

        return SupplierMapper.getSupplierResponseDTO(supplier);
    }

    @Override
    public SupplierResponseDTO update(SupplierRequestDTO request, Integer id) throws ResourceNotFoundException {
        Supplier supplier = this.getSupplierIfExists(id);
        Supplier updatedSupplier = this.updateSupplier(supplier, request);
        return SupplierMapper.getSupplierResponseDTO(this.supplierRep.save(updatedSupplier));
    }

    @Override
    public SupplierResponseDTO cancelById(Integer id, CancelItemRequestDTO setAvailable) throws ResourceNotFoundException {
        Supplier toDelete = this.getSupplierIfExists(id);
        toDelete.setAvailable(setAvailable.isAvailable());
        toDelete.setUpdatedAt(new Date());
        this.supplierRep.save(toDelete);
        if (!setAvailable.isAvailable()) {
            this.cancelSupplierProducts(id);
        }
        return SupplierMapper.getSupplierResponseDTO(toDelete);
    }

    @Override
    public boolean checkCuitExists(String cuit) {
        return this.supplierRep.existsByCuit(cuit);
    }

    @Override
    public long countAvailables() {
        return this.supplierRep.countByAvailableTrue();
    }

    private Supplier getSupplierIfExists(Integer id) throws ResourceNotFoundException {
        return this.supplierRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proveedor con el Id " + id + " no encontrado."));
    }

    private Supplier updateSupplier(Supplier supplier, SupplierRequestDTO requestDTO) throws ResourceNotFoundException {
        supplier = SupplierMapper.updateSupplierFromRequest(supplier, requestDTO);
        Sector sector = this.sectorRep.findById(requestDTO.getSectorId())
                .orElseThrow(() -> new ResourceNotFoundException("El rubro seleccionado no se encuentra disponible."));
        FiscalCondition fiscalCondition = this.fiscalCondRep.findById(requestDTO.getFiscalConditionId())
                .orElseThrow(() -> new ResourceNotFoundException("La condición fiscal seleccionada no se encuentra disponible."));
        Province province = this.provinceRep.findById(requestDTO.getFullAddress().getProvinceId())
                .orElseThrow(() -> new ResourceNotFoundException("La proovincia seleccionada no se encuentra disponible."));
        supplier.setSector(sector);
        supplier.setAddress(SupplierMapper.updateAddress(supplier.getAddress(), requestDTO.getFullAddress(), province));
        supplier.setFiscalCondition(fiscalCondition);
        supplier.setCode(this.getSupplierCode(supplier));
        supplier.setUpdatedAt(new Date());
        return supplier;
    }

    private Supplier getNewSupplier(SupplierRequestDTO requestDTO) throws ResourceNotFoundException {
        Supplier supplier = SupplierMapper.getSupplierFromRequest(requestDTO);
        Sector sector = this.sectorRep.findById(requestDTO.getSectorId())
                .orElseThrow(() -> new ResourceNotFoundException("El rubro seleccionado no se encuentra disponible."));
        FiscalCondition fiscalCondition = this.fiscalCondRep.findById(requestDTO.getFiscalConditionId())
                .orElseThrow(() -> new ResourceNotFoundException("La condición fiscal seleccionada no se encuentra disponible."));
        Province province = this.provinceRep.findById(requestDTO.getFullAddress().getProvinceId())
                .orElseThrow(() -> new ResourceNotFoundException("La proovincia seleccionada no se encuentra disponible."));
        supplier.setSector(sector);
        supplier.setAddress(SupplierMapper.getAddress(requestDTO.getFullAddress(), province));
        supplier.setAddress(supplier.getAddress());
        supplier.setFiscalCondition(fiscalCondition);
        supplier.setPhone(supplier.getPhone());
        supplier.getContact().setPhone(supplier.getContact().getPhone());
        supplier.setContact(supplier.getContact());
        supplier.setCode("");
        return supplier;

    }

    private String getSupplierCode(Supplier supplier) {
        return supplier.getSector().getSector().substring(0, 3) + supplier.getId();
    }

    private void cancelSupplierProducts(Integer id) {
        List<Product> suplierProducts = this.productRep.findByAvailableTrueAndSupplierId(id);
        for (Product product : suplierProducts) {
            product.setAvailable(false);
            this.productRep.save(product);
        }
    }
}
