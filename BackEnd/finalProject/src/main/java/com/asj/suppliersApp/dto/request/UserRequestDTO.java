package com.asj.suppliersApp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRequestDTO {
    private String username;
    private String passwordHash;
    private String email;
    private String name;
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
