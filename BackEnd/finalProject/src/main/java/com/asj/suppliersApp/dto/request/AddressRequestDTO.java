package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddressRequestDTO {
    @NotBlank(message = "La dirección no puede estar vacía.")
    @Size(min = 3, max = 75, message = "La dirección debe tener entre 3 y 75 caracteres.")
    private String address;
    @NotNull (message = "El número no puede ser nulo.")
    @Min(value = 0, message = "El número no puede ser negativo.")
    @Max(value = 99999, message = "El número no puede tener más de 5 dígitos.")
    private Integer addressNumber;
    @NotBlank
    private String city;
    @NotNull
    @Min(value = 1, message = "El Id de la provincia no puede ser menor a 1.")
    private Integer provinceId;
    @NotBlank
    @Size(min = 3, max = 10, message = "El cóigo postal debe contener entre 3 y 10 carácteres.")
    private String zipCode;

    public AddressRequestDTO() {
    }

    public AddressRequestDTO(String address, Integer addressNumber, String city, Integer provinceId, String zipCode) {
        this.address = address;
        this.addressNumber = addressNumber;
        this.city = city;
        this.provinceId = provinceId;
        this.zipCode = zipCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAddressNumber() {
        return addressNumber;
    }

    public void setAddressNumber(Integer addressNumber) {
        this.addressNumber = addressNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Integer provinceId) {
        this.provinceId = provinceId;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
