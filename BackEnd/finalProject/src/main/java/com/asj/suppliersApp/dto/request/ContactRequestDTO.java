package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)

public class ContactRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(min = 3, max = 75, message = "El nombre debe tener entre 3 y 75 caracteres.")
    private String name;
    @NotBlank(message = "El apellido no puede estar vacío.")
    @Size(min = 3, max = 75, message = "El apellido debe tener entre 3 y 75 caracteres.")
    private String surname;
    @NotNull(message = "El teléfono del contacto no puede ser nulo.")
    @Valid
    private PhoneRequestDTO phone;
    @NotBlank(message = "El mail no puede estar vacío.")
    @Size(max = 75, message = "El mail no puede tener más de 75 carácteres.")
    @Email(message = "El mail debe tener un formato válido.")
    private String mail;
    @NotBlank(message = "El rol no puede estar vacío.")
    @Size(min = 3, max = 75, message = "El rol debe tener entre 3 y 75 caracteres.")
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
