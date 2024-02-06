package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PhoneRequestDTO {
    @NotNull(message = "El código de pais no puede ser nulo.")
    @Min(value = 1, message = "El código de país no puede ser menor a 1")
    @Max(value = 9999, message = "El código de país no puede contener más de 4 números.")
    private Integer country;
    @NotBlank(message = "El número de teléfono no puede ser nulo.")
    @Size(min = 10, max = 13, message = "El número de teléfono debe contener entre 10 y 13 carácteres.")
    @Pattern(regexp = "^[0-9]+$", message = "El cuit debe contener solo números, no inserte los guiones.")
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
