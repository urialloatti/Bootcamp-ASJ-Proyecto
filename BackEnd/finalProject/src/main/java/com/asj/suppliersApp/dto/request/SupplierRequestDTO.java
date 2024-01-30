package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierRequestDTO {


    @NotBlank(message = "El nombre del proveedor no puede ser nulo.")
    @Size(min = 4, max = 50, message = "El nombre del proveedor debe tener entre 4 y 50 caracteres.")
    private String brand;
    @NotNull(message = "Debe seleccionar un rubro.")
    private Integer sectorId;
    @NotBlank(message = "La web no puede ser nula.")
    @URL(message = "La web debe tener un formato válido.")
    private String web;
    @NotNull(message = "El teléfono del provedor no puede ser nulo.")
    @Valid
    private PhoneRequestDTO phone;
    @NotNull(message = "La dirección del provedor no puede ser nulo.")
    @Valid
    private AddressRequestDTO fullAddress;
    @NotBlank
    @Size(min=10, max = 12, message = "El cuit debe tener 11 caracteres.")
    @Pattern(regexp = "^[0-9]+$", message = "El cuit debe contener solo números, no inserte los guiones.")
    private String cuit;
    @NotNull(message = "La condición fiscal no puede ser nula.")
    @Min(value = 1, message = "El Id de la condición fiscal no puede ser menor a 1.")
    private Integer fiscalConditionId;
    @NotNull(message = "El contacto no puede ser nulo.")
    @Valid
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
