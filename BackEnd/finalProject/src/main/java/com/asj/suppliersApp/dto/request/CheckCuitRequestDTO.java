package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
@JsonIgnoreProperties(ignoreUnknown = true)
public class CheckCuitRequestDTO {
    @NotBlank
    String cuit;

    public CheckCuitRequestDTO() {
    }

    public CheckCuitRequestDTO(String cuit) {
        this.cuit = cuit;
    }

    public String getCuit() {
        return cuit;
    }

    public void setCuit(String cuit) {
        this.cuit = cuit;
    }
}
