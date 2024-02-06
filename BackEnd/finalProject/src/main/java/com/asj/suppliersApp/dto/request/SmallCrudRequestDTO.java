package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SmallCrudRequestDTO {
    @NotBlank(message = "El nombre no puede ser nulo.")
    @Size(min = 4, max = 75, message = "El nombre debe tener entre 4 y 75 caracteres.")
    private String name;

    public SmallCrudRequestDTO() {
    }

    public SmallCrudRequestDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
