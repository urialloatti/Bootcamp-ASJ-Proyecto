package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRequestDTO {
    @NotBlank(message = "El nombre de usuario no puede ser nulo.")
    @Size(min = 4, max = 20, message = "El nombre de usuario debe tener entre 4 y 20 caracteres.")
    private String username;
    @NotBlank(message = "El password no puede estar vacío.")
    private String passwordHash;
    @NotBlank(message = "El email no puede estar vacío.")
    @Email(message = "El email debe tener un formato válido.")
    private String email;
    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres.")
    private String name;
    @NotBlank(message = "El apellido no puede estar vacío.")
    @Size(min = 3, max = 50, message = "El apellido debe tener entre 3 y 50 caracteres.")
    private String surname;
    private Integer rolId;

    public UserRequestDTO() {
    }

    public UserRequestDTO(String username, String passwordHash, String email, String name, String surname, Integer rolId) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.rolId = rolId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Integer getRolId() {
        return rolId;
    }

    public void setRolId(Integer rolId) {
        this.rolId = rolId;
    }
}
