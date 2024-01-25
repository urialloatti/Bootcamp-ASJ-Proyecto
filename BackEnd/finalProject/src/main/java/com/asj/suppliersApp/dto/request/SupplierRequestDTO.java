package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierRequestDTO {


    @NotBlank
    private String brand;
    @NotNull
    private Integer sectorId;
    @NotBlank
    private String web;
    @NotNull
    private PhoneRequestDTO phone;
    @NotNull
    private AddressRequestDTO fullAddress;
    @NotBlank
    private String cuit;
    @NotNull
    private Integer fiscalConditionId;
    @NotNull
    private ContactRequestDTO contact;
    private String logo;

    public SupplierRequestDTO() {
    }

    public SupplierRequestDTO(String brand, Integer sectorId, String web, PhoneRequestDTO phone, AddressRequestDTO fullAddress, String cuit, Integer fiscalConditionId, ContactRequestDTO contact, String logo) {
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

    public PhoneRequestDTO getPhone() {
        return phone;
    }

    public void setPhone(PhoneRequestDTO phone) {
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

    public ContactRequestDTO getContact() {
        return contact;
    }

    public void setContact(ContactRequestDTO contact) {
        this.contact = contact;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
