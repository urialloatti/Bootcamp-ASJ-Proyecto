package com.asj.suppliersApp.dto.bidirectional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactDTO {
    private String name;
    private String surname;
    private PhoneDTO phone;
    private String mail;
    private String rol;

    public ContactDTO() {
    }

    public ContactDTO(String name, String surname, PhoneDTO phone, String mail, String rol) {
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

    public PhoneDTO getPhone() {
        return phone;
    }

    public void setPhone(PhoneDTO phone) {
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
