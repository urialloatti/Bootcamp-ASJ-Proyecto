package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationResponseDTO {
    Integer countryId;
    String countryName;
    List<SmallCrudResponseDTO> provinces;

    public LocationResponseDTO() {
    }

    public LocationResponseDTO(Integer countryId, String countryName, List<SmallCrudResponseDTO> provinces) {
        this.countryId = countryId;
        this.countryName = countryName;
        this.provinces = provinces;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public List<SmallCrudResponseDTO> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<SmallCrudResponseDTO> provinces) {
        this.provinces = provinces;
    }
}
