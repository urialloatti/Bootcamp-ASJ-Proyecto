package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddressRequestDTO {
    @NotBlank
    private String address;
    @NotNull
    private Integer addressNumber;
    @NotBlank
    private String city;
    @NotNull
    private Integer provinceId;
    @NotBlank
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
