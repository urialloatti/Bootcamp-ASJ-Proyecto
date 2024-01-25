package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PhoneRequestDTO {
    @NotNull
    private Integer country;
    @NotBlank
    private String number;

    public PhoneRequestDTO() {
    }

    public PhoneRequestDTO(Integer country, String number) {
        this.country = country;
        this.number = number;
    }

    public Integer getCountry() {
        return country;
    }

    public void setCountry(Integer country) {
        this.country = country;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
