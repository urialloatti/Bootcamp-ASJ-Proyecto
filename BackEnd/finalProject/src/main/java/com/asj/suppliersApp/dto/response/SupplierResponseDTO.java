package com.asj.suppliersApp.dto.response;

import com.asj.suppliersApp.dto.bidirectional.ContactDTO;
import com.asj.suppliersApp.dto.bidirectional.PhoneDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierResponseDTO {
    private Integer id;
    private String code;
    private String brand;
    private String sector;
    private String web;
    private PhoneDTO phone;
    private AddressResponseDTO fullAddress;
    private String cuit;
    private String fiscalCondition;
    private ContactDTO contact;
    private String logo;

    public SupplierResponseDTO() {
    }

    public SupplierResponseDTO(Integer id, String code, String brand, String sector, String web, PhoneDTO phone, AddressResponseDTO fullAddress, String cuit, String fiscalCondition, ContactDTO contact, String logo) {
        this.id = id;
        this.code = code;
        this.brand = brand;
        this.sector = sector;
        this.web = web;
        this.phone = phone;
        this.fullAddress = fullAddress;
        this.cuit = cuit;
        this.fiscalCondition = fiscalCondition;
        this.contact = contact;
        this.logo = logo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
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

    public AddressResponseDTO getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(AddressResponseDTO fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getCuit() {
        return cuit;
    }

    public void setCuit(String cuit) {
        this.cuit = cuit;
    }

    public String getFiscalCondition() {
        return fiscalCondition;
    }

    public void setFiscalCondition(String fiscalCondition) {
        this.fiscalCondition = fiscalCondition;
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
