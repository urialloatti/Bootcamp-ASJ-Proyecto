package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierResponseDTO {
    private Integer id;
    private String code;
    private String brand;
    private String sector;
    private String web;
    private PhoneResponseDTO phone;
    private AddressResponseDTO fullAddress;
    private String cuit;
    private String fiscalCondition;
    private ContactResponseDTO contact;
    private String picture;
    private boolean available;

    public SupplierResponseDTO() {
    }

    public SupplierResponseDTO(Integer id, String code, String brand, String sector, String web, PhoneResponseDTO phone, AddressResponseDTO fullAddress, String cuit, String fiscalCondition, ContactResponseDTO contact, String picture, boolean available) {
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
        this.picture = picture;
        this.available = available;
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

    public PhoneResponseDTO getPhone() {
        return phone;
    }

    public void setPhone(PhoneResponseDTO phone) {
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

    public ContactResponseDTO getContact() {
        return contact;
    }

    public void setContact(ContactResponseDTO contact) {
        this.contact = contact;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
