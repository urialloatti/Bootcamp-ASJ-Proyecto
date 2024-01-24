package com.asj.suppliersApp.dto.request;

import com.asj.suppliersApp.dto.bidirectional.ContactDTO;
import com.asj.suppliersApp.dto.bidirectional.PhoneDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierRequestDTO {
    private String brand;
    private Integer sectorId;
    private String web;
    private PhoneDTO phone;
    private AddressRequestDTO fullAddress;
    private String cuit;
    private Integer fiscalConditionId;
    private ContactDTO contact;
    private String logo;

    public SupplierRequestDTO() {
    }

    public SupplierRequestDTO(String brand, Integer sectorId, String web, PhoneDTO phone, AddressRequestDTO fullAddress, String cuit, Integer fiscalConditionId, ContactDTO contact, String logo) {
        this.brand = brand;
        this.sectorId = sectorId;
        this.web = web;
        this.phone = phone;
        this.fullAddress = fullAddress;
        this.cuit = cuit;
        this.fiscalConditionId = fiscalConditionId;
        this.contact = contact;
        this.logo = logo;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getSectorId() {
        return sectorId;
    }

    public void setSectorId(Integer sectorId) {
        this.sectorId = sectorId;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public PhoneDTO getPhone() {
        return phone;
    }

    public void setPhone(PhoneDTO phone) {
        this.phone = phone;
    }

    public AddressRequestDTO getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(AddressRequestDTO fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getCuit() {
        return cuit;
    }

    public void setCuit(String cuit) {
        this.cuit = cuit;
    }

    public Integer getFiscalConditionId() {
        return fiscalConditionId;
    }

    public void setFiscalConditionId(Integer fiscalConditionId) {
        this.fiscalConditionId = fiscalConditionId;
    }

    public ContactDTO getContact() {
        return contact;
    }

    public void setContact(ContactDTO contact) {
        this.contact = contact;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
