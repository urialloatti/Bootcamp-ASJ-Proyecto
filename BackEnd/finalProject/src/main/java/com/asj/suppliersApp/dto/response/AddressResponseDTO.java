package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddressResponseDTO {
    private String address;
    private int addressNumber;
    private String city;
    private String country;
    private String province;
    private String zipCode;

    public AddressResponseDTO() {
    }

    public AddressResponseDTO(String address, int addressNumber, String city, String country, String province, String zipCode) {
        this.address = address;
        this.addressNumber = addressNumber;
        this.city = city;
        this.country = country;
        this.province = province;
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

    public void setAddressNumber(int addressNumber) {
        this.addressNumber = addressNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
