package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)

public class ContactRequestDTO {
    @NotBlank
    private String name;
    @NotBlank
    private String surname;
    @NotNull
    private PhoneRequestDTO phone;
    @NotBlank
    private String mail;
    @NotBlank
    private String rol;

    public ContactRequestDTO() {
    }

    public ContactRequestDTO(String name, String surname, PhoneRequestDTO phone, String mail, String rol) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.mail = mail;
        this.rol = rol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public PhoneRequestDTO getPhone() {
        return phone;
    }

    public void setPhone(PhoneRequestDTO phone) {
        this.phone = phone;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
