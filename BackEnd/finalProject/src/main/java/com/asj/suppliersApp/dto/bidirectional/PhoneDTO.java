package com.asj.suppliersApp.dto.bidirectional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PhoneDTO {
    private int country;
    private String number;

    public PhoneDTO() {
    }

    public PhoneDTO(int country, String number) {
        this.country = country;
        this.number = number;
    }

    public int getCountry() {
        return country;
    }

    public void setCountry(int country) {
        this.country = country;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
